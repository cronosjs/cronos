require("dotenv").config({path: "./.env"})

const {Client, Collection} = require("discord.js");
const chalk = require("chalk");
const {prefix} = require("./json/config.json");
const client = new Client({disableMentions: "everyone"});
const {loadCommands} = require("./utilities/loadcmds.js");

require("./utilities/loadevents")(client);

client.login(process.env.main_token).then(() => {
    console.log(
        chalk.bgBlueBright.black(
            ` Successfully logged in as: ${client.user.username}#${client.user.discriminator} `
        )
    )
});

client.commands = new Collection();
client.prefix = prefix;
client.queue = new Map();

loadCommands(client);
