# Discord Bot and Node.js Server Documentation

## Prerequisites

- Node.js v14 or higher
- Discord.js v13 or higher
- A Discord account and a Discord server where the bot will be added

## Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/ccamisoss/discord-bot.git discord-bot

    cd discord-bot
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the project root and add the following credentials:
    ```env
    BOT_TOKEN=YOUR_DISCORD_BOT_TOKEN
    PORT=3001
    WELCOME_CHANNEL_ID=YOUR_WELCOME_CHANNEL_ID
    MEMBER_ROLE_ID=YOUR_DEFAULT_GUEST_ROLE_ID
    AUTH_TOKEN=YOUR_CUSTOM_AUTH_TOKEN
    API_URL=http://localhost:3001
    FACTS_API_KEY=YOUR_API_KEY
    ```

4. For the facts api-key, go to [text](https://api-ninjas.com/), sign up and get your api key in the user dashboard.

5. Run the bot and the server:
    ```bash
    npm start
    ```

## Discord Bot Commands


#### `hello`
Greet the bot and it will greet you back.

```plaintext
User: hello
Bot: Hi! :)
```

#### `!help`
Displays a dummy answer.

```plaintext
User: !help
Bot: How can I help you?.
```

#### `!info`
Displays a random fact.

```plaintext
User: !info
Bot: An elephant cannot jump
```

#### `!serverinfo`
Displays information about the server.

```plaintext
User: !serverinfo
Bot: Bot: Server name: Lucy's server
     Created: 26/04/2024 02:21
     Members:  FredBoat♪♪, ccamisos, Star Bot ☆
     Member count: 3
```

#### `!send channel_id message`
Sends a message to the indicated channel.

```plaintext
User: !send 2189281929812 hello
Bot: Message successfully sent.
```

#### **The bot can also greet new server members and automatically assign them the default guest role previously configured.**