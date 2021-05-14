require("dotenv").config({path: __dirname + "/.env"})
const { Client, Collection } = require("discord.js");
const client = new Client({ disableMentions: "everyone" });
// const { loadCommands } = require("./loadcmds");

// require("./loadevents")(client);

client.login(process.env.main_token).then((x) => //X is the Token
    console.log(`Successfully logged in as: ${client.user.username}#${client.user.discriminator}`)
);
client.commands = new Collection();
// client.prefix = PREFIX;
client.queue = new Map();

// loadCommands(client);
