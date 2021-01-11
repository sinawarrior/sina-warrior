const fetch = require('node-fetch');
const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client();
var config = require('./config.json');

var MainMSG;

client.on('ready', () => { // When the bot turns on
  setInterval(() => {

      const statuses = [
          `Tokyo Role Play`,
      ]

      const status = statuses[Math.floor(Math.random() * statuses.length)]
      client.user.setActivity(status, { type: "WATCHING" }) 

  }, 5000) 
});
client.on("ready", async () => {
  console.log(`The Bot Is Ready.`)

  console.log(`search the sina git.`)

  console.log(`Loading > 1`)

  console.log(`Loading > 2`)

  console.log(`Loading > 3`)

  console.log(`Completed.Dont copy my code `)
   
  if(config['channel-id'].length !== 18) {
    console.log(`Please Put Channel ID On File Named: "config.json`);
    return;
  }
  if(config['channel-id'].length === 18 && config['message-id'].toLowerCase() === "setup") {
    var time = new Date();
    var ch = client.channels.cache.get(`${config['channel-id']}`);
    console.log(`Setup Mode Activited.. Sending A Message To: ${ch.name}`);
    var embed = new discord.MessageEmbed()
    .setTitle(`${config.offline.title}`)
    .setDescription(`${config.offline.description}`)
    .addFields({name: `${config.offline['field1-title']}`, value: `${config.offline['field1-value']}`, inline: true }, { name: `${config.offline['field2-title']}`, value: `${config.offline['field2-value']}`, inline: true }, { name: `${config.online['field3-title']}`, value: `${config.offline['field3-value']}`, inline: true })
    .setColor(`${config.offline.color}`)
    .setFooter(`${config.offline.footer}`.replace("%hour%", fixTime(time.getHours())).replace("%minute%", fixTime(time.getMinutes())).replace("%second%", fixTime(time.getSeconds())).replace("%day%", fixTime(time.getDay())).replace("%month%", fixTime(time.getMonth())).replace("%year%", time.getFullYear()));
    var message = await ch.send(embed);
    var json = JSON.parse(fs.readFileSync('./config.json'));
    json["message-id"] = message.id;
    fs.writeFileSync("./config.json", JSON.stringify(json, null, 4));
    console.log(`A Messsage Sent To "${ch.name} And Message ID Is: ${message.id}\n!! You Don't Need To Put Message ID Its All Automatic !!`)
    config = require('./config.json');
  }
  var json2 = JSON.parse(fs.readFileSync('./config.json'));
  var channel = client.channels.cache.get(`${config['channel-id']}`);
  MainMSG = (await channel.messages.fetch({limit: 100})).filter(m => m.id === `${json2['message-id']}`).first();
  await updateMessage();
})

async function updateMessage() {
    var data = await getStatus();
    var time = new Date()
    var embed = new discord.MessageEmbed();
    if(data.serverStatus === "Online") {
      embed.setTitle(`${config.online.title}`);
      embed.setDescription(`${config.online.description}`.replace("%players_amount%", data.playersAmount).replace("%max_players_amount%", data.maxPlayersAmount).replace("%players_spacetaken%", parseInt(data.playersAmount / data.maxPlayersAmount * 100)).replace("%average_ping%", parseInt(data.playersPing / data.playersAmount)).replace("%ip%", config.serverip));
      embed.addFields({name: `${config.online['field1-title']}`, value: data.idsList, inline: true }, { name: `${config.online['field2-title']}`, value: data.namesList, inline: true }, { name: `${config.online['field3-title']}`, value: data.discordList, inline: true });
      embed.setColor(`${config.online.color}`);
      embed.setFooter(`${config.offline.footer}`.replace("%hour%", fixTime(time.getHours())).replace("%minute%", fixTime(time.getMinutes())).replace("%second%", fixTime(time.getSeconds())).replace("%day%", fixTime(time.getDay())).replace("%month%", fixTime(time.getMonth())).replace("%year%", time.getFullYear()));
    } else if(data.serverStatus === "Offline") {
      embed.setTitle(`${config.offline.title}`);
      embed.setDescription(`${config.offline.description}`);
      embed.addFields({name: `${config.offline['field1-title']}`, value: `${config.offline['field1-value']}`, inline: true }, { name: `${config.offline['field2-title']}`, value: `${config.offline['field2-value']}`, inline: true }, { name: `${config.online['field3-title']}`, value: `${config.offline['field3-value']}`, inline: true });
      embed.setColor(`${config.offline.color}`);
      embed.setFooter(`${config.offline.footer}`.replace("%hour%", fixTime(time.getHours())).replace("%minute%", fixTime(time.getMinutes())).replace("%second%", fixTime(time.getSeconds())).replace("%day%", fixTime(time.getDay())).replace("%month%", fixTime(time.getMonth())).replace("%year%", time.getFullYear()));
    }
    MainMSG.edit(embed);
    setTimeout(updateMessage, 5000)
}
  
async function getStatus() {
  var ids = "", names = "", discords = "", status = "Online", playersAmount = 0, ping = 0; 
  try {
    var jsonFromURL = await fetch(`http://${config.serverip}/players.json`, {method: "GET"} ).then(json => json.json());
  } catch {
    return {idsList: "‏‏‎ ‎", namesList: "‏‏‎ ‎", discordList: "‏‏‎ ‎", serverStatus: "Offline", playersAmount: "‏‏0‎", maxPlayersAmount: "0‎"}
  }
  for(var playerPlace = 0; playerPlace < jsonFromURL.length; playerPlace++) {
    names += jsonFromURL[playerPlace].name + "\n";
    discords += await getDiscord(jsonFromURL, playerPlace) + "\n";
    ids += jsonFromURL[playerPlace].id + "\n";
    ping += jsonFromURL[playerPlace].ping;
    playersAmount += 1;
  }
  jsonFromURL = await fetch(`http://${config.serverip}/info.json`, {method: "GET"} ).then(json => json.json());
  return {idsList: ids, namesList: names, discordList: discords, serverStatus: status, playersAmount: playersAmount, maxPlayersAmount: jsonFromURL.vars.sv_maxClients, playersPing: ping}
}
  
async function getDiscord(json, playerPlace) {
  var temp = "Discord Not Found";
  for(var i = 0; i < json[playerPlace].identifiers.length; i++) {
    if(`${json[playerPlace].identifiers[i]}`.startsWith("discord:")) {
      if(config.discord['tag-discord']) {
        temp = `<@${json[playerPlace].identifiers[i].slice(8, 28)}>`;
      } else {
        var user = await client.users.fetch(json[playerPlace].identifiers[i].slice(8, 28))
        temp = user.username + "#" + user.discriminator;
      }
    } 
  }
  return temp;
}
  
function fixTime(time) {
  if(`${time}`.length === 1) {
    return `0${time}`
  } else {
    return time;
  }
}

client.login(`${config['bot-token']}`);
