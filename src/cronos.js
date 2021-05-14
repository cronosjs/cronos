require("dotenv").config({path: __dirname + "/.env"})

const Discord = require("discord.js");
const chalk = require("chalk");
const { prefix } = require('./config.json')
const client = new Discord.Client({
  disableMentions: "everyone",
  fetchAllMembers: true,
});
const { loadCommands } = require("./loadcmds");

require("./utilities/loadevents")(client);

client.login(process.env.main_token).then(
  (
    x //X is the Token
  ) =>
    console.log(
      chalk.bgBlueBright.black(
        ` Successfully logged in as: ${client.user.username}#${client.user.discriminator} `
      )
    )
);


client.commands = new Discord.Collection();
client.prefix = prefix;
client.queue = new Map();
loadCommands(client);
