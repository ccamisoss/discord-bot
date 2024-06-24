const axios = require("axios");
const {
  AUTH_TOKEN,
  MEMBER_ROLE_ID,
  API_URL,
  FACTS_API_KEY,
} = require("../config");

const getServerInfo = async (message) => {
  try {
    const response = await axios.get(`${API_URL}/api/server-info`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });
    const serverInfo = response.data;
    message.channel.send(
      `**Server name:** ${serverInfo.name}\n**Created:** ${serverInfo.creationDate}\n**Members:** ${serverInfo.memberNames}\n**Member count:** ${serverInfo.memberCount}`
    );
  } catch (error) {
    console.error(error);
    message.channel.send(
      "There was an error obtaining information from the server."
    );
  }
};

const sendMessage = async (message) => {
  const args = message.content.split(" ");
  const channelID = args[1];
  const messageContent = args.slice(2).join(" ");

  try {
    await axios.post(
      `${API_URL}/api/send-message`,
      {
        channelID: channelID,
        message: messageContent,
      },
      {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }
    );

    message.channel.send("Message successfully sent.");
  } catch (error) {
    message.channel.send("There was an error sending the message");
    console.error(error);
  }
};

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token && token === AUTH_TOKEN) {
    next();
  } else {
    res.status(403).send("Forbidden: Invalid token");
  }
};

const addMemberRole = async (member, channel) => {
  const role = member.guild.roles.cache.get(MEMBER_ROLE_ID);

  if (role) {
    try {
      await member.roles.add(role);
      channel.send(`Assigned role **${role.name}** to <@${member.user.id}>`);
    } catch (error) {
      console.error(`Failed to assign role: ${error}`);
    }
  } else {
    console.error(`Role not found`);
  }
};

const formatDateTime = (datetime) => {
  const date = new Date(datetime);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

  return formattedDate;
};

const getRandomFact = async () => {
  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/facts", {
      headers: {
        "X-Api-Key": FACTS_API_KEY,
      },
    });
    return response.data[0].fact;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getServerInfo,
  sendMessage,
  authenticate,
  addMemberRole,
  formatDateTime,
  getRandomFact,
};
