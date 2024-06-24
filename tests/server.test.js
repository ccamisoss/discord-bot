const request = require("supertest");
const { app, server } = require("../src/server");
const { Client } = require("discord.js");
const {
  AUTH_TOKEN,
  BOT_TOKEN,
  WELCOME_CHANNEL_ID,
} = require("../src/config");

const client = new Client({ intents: 3276799 });

describe("Node.js Server Endpoints", () => {
  beforeAll(async () => {
    await client.login(BOT_TOKEN);
  });

  afterAll(async () => {
    await client.destroy();
    await server.close();
  });

  test("GET /api/server-info should return server information", async () => {
    const response = await request(app)
      .get("/api/server-info")
      .set("Authorization", AUTH_TOKEN);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("memberCount");
  });

  test("POST /api/send-message should send a message to a specific channel", async () => {
    const response = await request(app)
      .post("/api/send-message")
      .set("Authorization", AUTH_TOKEN)
      .send({ channelID: WELCOME_CHANNEL_ID, message: "Hello, world!" });

    expect(response.status).toBe(200);
    expect(response.text).toBe("Message sent");
  });

  test("POST /api/send-message without auth token should return 403", async () => {
    const response = await request(app)
      .post("/api/send-message")
      .send({ channelID: WELCOME_CHANNEL_ID, message: "Hello, world!" });

    expect(response.status).toBe(403);
    expect(response.text).toBe("Forbidden: Invalid token");
  });
});
