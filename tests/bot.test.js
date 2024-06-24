const { Client, Events } = require("discord.js");
const { WELCOME_CHANNEL_ID } = require("../src/config");
const {
  getServerInfo,
  sendMessage,
  addMemberRole,
} = require("../src/hooks");

jest.mock("discord.js");
jest.mock("../src/hooks", () => ({
  getServerInfo: jest.fn(),
  sendMessage: jest.fn(),
  addMemberRole: jest.fn(),
  getRandomFact: jest.fn().mockResolvedValue("Random fact"),
}));

describe("Discord Bot", () => {
  let mockClient;
  let mockChannel;
  let readyCallback, guildMemberAddCallback, messageCreateCallback;
  readyCallback = jest.fn();
  guildMemberAddCallback = jest.fn();
  messageCreateCallback = jest.fn();
  
  beforeEach(() => {
    mockChannel = {
      send: jest.fn(),
    };

    mockClient = {
      on: jest.fn(),
      login: jest.fn(),
      channels: {
        fetch: jest.fn().mockResolvedValue(mockChannel),
      },
    };
    Client.mockImplementation(() => mockClient);


    mockClient.on.mockImplementation((event, callback) => {
      if (event === Events.ClientReady) readyCallback = callback;
      if (event === Events.GuildMemberAdd) guildMemberAddCallback = callback;
      if (event === Events.MessageCreate) messageCreateCallback = callback;
    });

    require("../src/bot");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should welcome new member and assign role if not a bot", async () => {
    const member = {
      user: { id: "12345", bot: false },
      guild: { id: "67890" },
    };
    await guildMemberAddCallback(member);
    expect(mockClient.channels.fetch).toHaveBeenCalledWith(WELCOME_CHANNEL_ID);
    expect(mockChannel.send).toHaveBeenCalledWith(
      `**<@${member.user.id}> welcome to the server!** ✨`
    );
    expect(addMemberRole).toHaveBeenCalledWith(member, mockChannel);
  });
  
  test("should handle message content correctly on MessageCreate event", async () => {
    const message = {
      author: { bot: false },
      content: "hello",
      reply: jest.fn(),
    };
    await messageCreateCallback(message);
    expect(message.reply).toHaveBeenCalledWith("Hi! :)");

    message.content = "!help";
    await messageCreateCallback(message);
    expect(message.reply).toHaveBeenCalledWith("How can I help you?");

    message.content = "!info";
    await messageCreateCallback(message);
    expect(message.reply).toHaveBeenCalledWith(
      "Random fact"
    );

    message.content = "!serverinfo";
    await messageCreateCallback(message);
    expect(getServerInfo).toHaveBeenCalledWith(message);

    message.content = "!send";
    await messageCreateCallback(message);
    expect(sendMessage).toHaveBeenCalledWith(message);
  });

  test("should initialize and log 'Bot is online!' on ready event", () => {
    console.log = jest.fn();
    readyCallback();
    expect(console.log).toHaveBeenCalledWith("Bot is online!");
  });
  
  test("should not assign role if the member is a bot", async () => {
    const member = {
      user: { id: "12345", bot: true },
    };
    await guildMemberAddCallback(member);
    expect(addMemberRole).not.toHaveBeenCalled();
  });
  
  test("should not respond to messages from bots", async () => {
    const message = {
      author: { bot: true },
      content: "hello",
      reply: jest.fn(),
    };
    await messageCreateCallback(message);
    expect(message.reply).not.toHaveBeenCalled();
  });
});
