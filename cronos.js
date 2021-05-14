const { Client, Collection } = require("discord.js");
const client = new Client({ disableMentions: "everyone" });
const { loadCommands } = require("./loadcmds");

require("./loadevents")(client);

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();

loadCommands(client);
