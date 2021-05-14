const reqEvent = (event) => require(`../events/ready`);

module.exports = (client) => {
  client.on("ready", () => reqEvent("ready")(client));
  
  // warnings and errors
  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);
  client.on("unhandledRejection", console.error);
};
