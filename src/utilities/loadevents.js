const clientEvent = (event) => require(`../events/client/${event}`);
const guildEvent = (event) => require(`../events/guild/${event}`);
const otherEvent = (event) => require(`../events/other/${event}`);
const Discord = require("discord.js");

function loadEvents(client) {
  const cooldowns = new Discord.Collection();

  // client events
  client.on("ready", () => clientEvent("ready")(client));
  client.on("messageCreate", (m) => clientEvent("mention")(m, client));
  client.on("guildCreate", (g) => clientEvent("joinGuild")(g, client));
  client.on("guildDelete", (g) => clientEvent("leftGuild")(g, client));

  // guild events
  client.on("guildCreate", (g) => guildEvent("guildCreate")(g, client));
  client.on("guildDelete", (g) => guildEvent("guildDelete")(g, client));
  client.on("guildMemberAdd", (m) => guildEvent("guildMemberAdd")(m, client));
  client.on("guildMemberRemove", (m) =>
    guildEvent("guildMemberRemove")(m, client)
  );
  client.on("messageCreate", (m) => guildEvent("message")(m, cooldowns));

  // other events
  client.on("messageCreate", (m) => otherEvent("checkGuild")(m, client));
  client.on("messageCreate", (m) => otherEvent("leveling")(m, client));
  client.on("interactionCreate", (i) => otherEvent("interaction")(i, client));

  // warnings and errors
  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);


}

module.exports = {
  loadEvents,
};
