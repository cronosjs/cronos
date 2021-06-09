const reqEvent = (event) => require(`../events/${event}`);
const Discord = require("discord.js");

module.exports = (client) => {
  const cooldowns = new Discord.Collection();

  client.on("ready", () => reqEvent("ready")(client));
  client.on("guildCreate", (g) => reqEvent("guildCreate")(g, client));
  client.on("guildDelete", (g) => reqEvent("guildDelete")(g, client));
  client.on("guildMemberAdd", (m) => reqEvent("guildMemberAdd")(m, client));
  client.on("message", (m) => reqEvent("message")(m, cooldowns));

  // warnings and errors
  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);
  client.on("unhandledRejection", console.error);
};
