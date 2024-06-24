const express = require('express');
const { formatDateTime } = require('../hooks');
const router = express.Router();
const client = require("../bot");

router.get("/server-info", (req, res) => {
  const server = client.guilds.cache.first();

  const serverInfo = {
    name: server.name,
    memberCount: server.memberCount,
    creationDate: formatDateTime(server.createdAt),
    memberNames: server.members.cache.map((member) => ` ${member.user.username}`),
  };

  res.json(serverInfo);
});

router.post("/send-message", async (req, res) => {
  const { channelID, message } = req.body;
  const channel = await client.channels.fetch(channelID);

  if (channel) {
    channel.send(message);
    res.status(200).send("Message sent");
  } else {
    res.status(404).send("Channel not found");
  }
});

module.exports = router;
