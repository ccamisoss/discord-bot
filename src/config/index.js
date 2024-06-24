require('dotenv').config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  PORT: process.env.PORT,
  WELCOME_CHANNEL_ID: process.env.WELCOME_CHANNEL_ID,
  MEMBER_ROLE_ID: process.env.MEMBER_ROLE_ID,
  AUTH_TOKEN: process.env.AUTH_TOKEN,
  API_URL: process.env.API_URL,
  FACTS_API_KEY: process.env.FACTS_API_KEY,
};