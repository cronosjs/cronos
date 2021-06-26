const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "blackjack",
  async execute(client, cmd) {
    const embed = new MessageEmbed().setDescription("It worked");

    await cmd.reply({ embeds: [embed] });
  },
};
