const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "leaderboard",
  aliases: ["lb", "topxp"],
  async execute(client, message, args) {
    let guildID = message.guild.id;

    let top = client.xp.getLeaderboard(guildID);

    if (!top) return message.reply("Cri cri... No one has xp in this server");

    let lbEmbed = new MessageEmbed().setTitle(`${message.guild}'s leaderoard`);

    for (let i = 0; i < 10; i++) {
      lbEmbed.addField(`${i + 1}: ${top[i][0]}`);
    }

    return message.channel.send(lbEmbed);
  },
};
