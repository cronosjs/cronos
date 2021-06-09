const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "leaderboard",
  aliases: ["lb", "topxp"],
  async execute(client, message, args) {
    let guildID = message.guild.id;

    let limit = Number(args[0])
    if(!limit || limit <= 0) limit = 10

    let top = await client.xp.getLeaderboard(guildID, limit);

    if (!top) return message.reply("Cri cri... No one has xp in this server");

    let lbEmbed = new MessageEmbed().setTitle(`${message.guild}'s leaderboard`);

    for (let i = 0; i < top.length; i++) {
      lbEmbed.addField(`**${i + 1}:** ${message.guild.members.cache.get(top[i][0]).user.username}`, `Level: **${top[i][1].level}** (XP: ${top[i][1].xp})` );
    }

    return message.channel.send(lbEmbed);
  },
};
