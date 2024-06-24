const { Client, Events } = require("discord.js");
const { BOT_TOKEN, WELCOME_CHANNEL_ID } = require("../config");
const { getServerInfo, sendMessage, addMemberRole, getRandomFact } = require("../hooks");
const client = new Client({ intents: 3276799 });

client.on(Events.ClientReady, () => {
  console.log("Bot is online!");
});

client.on(Events.GuildMemberAdd, async (member) => {
  const channel = await client.channels.fetch(WELCOME_CHANNEL_ID);
  await channel.send(`**<@${member.user.id}> welcome to the server!** ✨`);
  if (member.user.bot) return;
  await addMemberRole(member, channel);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!send")) {
    sendMessage(message);
  } else {
    switch (message.content.toLowerCase()) {
      case "hello":
        message.reply("Hi! :)");
        break;
      case "!help":
        message.reply("How can I help you?");
        break;
      case "!info":
        message.reply(await getRandomFact());
        break;
      case "!serverinfo":
        getServerInfo(message);
        break;
      default:
        break;
    }
  }
});

client.login(BOT_TOKEN);

module.exports = client;
