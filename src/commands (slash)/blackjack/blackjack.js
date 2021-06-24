const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "blackjack",
  async execute(client, interaction) {
    const embed = new MessageEmbed().setDescription("It worked");

    await interaction.reply({ embeds: [embed] });
  },
};
