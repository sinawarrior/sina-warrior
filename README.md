# Info

FiveM Status Discord Bot
With The Options To Change To Your Desgin.

# Config
The Config File Location Is On The Bot Folder Name: "config.json" And There You Will Find This:
```
{
    "serverip": "",
    "channel-id": "YOUR-CHANNEL-ID!!!!",
    "message-id": "SETUP",
    "discord": {
        "discord-not-found": "**Discord Not Found**",
        "tag-discord": false
    },
    "online": {
        "title": "FiveM Server Status | The Server Is Online",
        "color": "GREEN",
        "description": "Server Players Amount: **%players_amount%/%max_players_amount%**\nServer Place Taken: **%players_spacetaken%%**\nAverage Ping: **%average_ping%ms**",
        "field1-title": "**ID**",
        "field2-title": "**Name**",
        "field3-title": "**Discord**",
        "footer": "This Bot Coded Elior#0590 | Last Updated: %hour%:%minute%:%second% - %day%/%month%/%year%"
    },
    "offline": {
        "title": "FiveM Server Status | The Server Is Offline",
        "color": "RED",
        "description": "Server Players Amount: **0/0**\nServer Place Taken: **0%**\nAverage Ping: **0ms**",
        "field1-title": "**ID**",
        "field1-value": "...",
        "field2-title": "**Name**",
        "field2-value": "...",
        "field3-title": "**Discord**",
        "field3-value": "...",
        "footer": "This Bot Coded Elior#0590 | Last Updated: %hour%:%minute%:%second% - %day%/%month%/%year%"
    },
    "bot-token": ""
}
```

First Of All You Need To Put Some Data On Your FiveM Server And Bot's Token

bot-token: you need to create a bot and take the token from [here](https://discord.com/developers/applications)
server-ip: the fivem server IP
channel-id: the channel id that the message on (if you don't have message put on message-id "setup")
