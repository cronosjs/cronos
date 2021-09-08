const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "leaderboard",
  aliases: ["lb", "topxp"],
  category: "leveling",
  botPerms: ["EMBED_LINKS"],
  async execute(client, cmd) {
    let guildID = cmd.guildId;

    let limit = cmd.options.get("limit");
    if (!limit || limit.limit <= 0) limit = 10;

    let top = await client.xp.getLeaderboard(guildID, limit);

    if (!top) return cmd.reply("Cri cri... No one has xp in this server");

    let lbEmbed = new MessageEmbed().setTitle(`${cmd.guild}'s leaderboard`);

    for (let i = 0; i < top.length; i++) {
      lbEmbed.addField(
        `**${i + 1}.** ${cmd.guild.members.cache.get(top[i][0]).user.username}`,
        `Level: **${top[i][1].level}** (XP: ${top[i][1].xp})`
      );
    }

    return cmd.reply({ embeds: [lbEmbed] });
  },
};
