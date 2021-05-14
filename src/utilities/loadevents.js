const reqEvent = (event) => require(`../events/${event}`);

module.exports = (client) => {
  client.on("ready", () => reqEvent("ready")(client));
  client.on("guildCreate", reqEvent("guildCreate"));
  
  // warnings and errors
  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);
  client.on("unhandledRejection", console.error);
};
