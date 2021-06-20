const Discord = require("discord.js");
module.exports = {
  name: "rank",
  category: "leveling",
  async execute(client, message, args) {
    // user who will get the xp
    let target = message.mentions.users.first()
      ? message.mentions.users.first()
      : message.author;

    let guildID = message.guild.id;

    let checkUser = await client.xp.isUser(guildID, target.id);
    let user = await client.xp.getUser(guildID, target.id);
    let userRank = await client.xp.getUserRank(guildID, target.id);

    let avatar = target.displayAvatarURL({ format: "png" });
    let rank = checkUser ? userRank : 0
    let level = checkUser ? user.level : 0;
    let currentXp = checkUser ? user.xp : 0;
    let nextXp = await client.xp.xpForNext(currentXp);

    const image = await new client.images.rank()
      .setAvatar(avatar)
      .setXP("current", currentXp)
      .setXP("needed", nextXp.nextLevelXp)
      .setLevel(level)
      .setRank(rank)
      .setReputation(0)
      .setTitle("soon")
      .setUsername(target.username)
      .toAttachment();

    const attachment = new Discord.MessageAttachment(
      image.toBuffer(),
      "rank.png"
    );

    message.channel.send(attachment);
  },
};
