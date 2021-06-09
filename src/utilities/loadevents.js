const clienEvent = (event) => require(`../events/client/${event}`);
const guildEvent = (event) => require(`../events/guild/${event}`);
const otherEvent = (event) => require(`../events/other/${event}`);
const Discord = require("discord.js");

module.exports = (client) => {
  const cooldowns = new Discord.Collection();

  // client events
  client.on("ready", () => clienEvent("ready")(client));
  client.on("message", (m) => clienEvent("mention")(m, client));

  // guild events
  client.on("guildCreate", (g) => guildEvent("guildCreate")(g, client));
  client.on("guildDelete", (g) => guildEvent("guildDelete")(g, client));
  client.on("guildMemberAdd", (m) => guildEvent("guildMemberAdd")(m, client));
  client.on("message", (m) => guildEvent("message")(m, cooldowns));

  // other events
  client.on("message", (m) => otherEvent("leveling")(m, client));
  
  // warnings and errors
  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);
  client.on("unhandledRejection", console.error);
};
