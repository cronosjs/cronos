const Meme = require("memer-api");
const memer = new Meme("8EqDoDv8ZfI");
const Discord = require("discord.js");
module.exports = {
  name: "test",
  async execute(client, message, args, prefix) {
    console.log(client.myemojis)
  },
};
