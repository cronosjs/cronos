const { MessageEmbed } = require("discord.js");

module.exports = class Leaderboard extends Command {
  constructor() {
    super({
      name: "leaderboard",
      aliases: ["lb"],
      description: "View the leaderboard of the server.",
      usage: "<limit>",
      category: "Leveling",
      cooldown: 3000,
      memberPerms: [],
      clientPerms: [],
    });
  }
  async exec(message, [limit], data) {
    if (isNaN(limit) || limit <= 0) limit = 10;

    let top = await this.client.xp.getLeaderboard(message.guild.id, limit);

    if (!top) return message.reply("Cri cri... No one has xp in this server");

    let emb = new MessageEmbed().setTitle(`${message.guild}'s leaderboard`);

    for (let i = 0; i < top.length; i++) {
      emb.addField(
        `**${i + 1}:** ${
          message.guild.members.cache.get(top[i][0]).user.username
        }`,
        `Level: **${top[i][1].level}** (XP: ${top[i][1].xp})`
      );
    }

    return message.channel.send({ embeds: [emb] });
  }
};
