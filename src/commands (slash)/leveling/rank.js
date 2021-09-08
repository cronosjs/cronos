const Discord = require("discord.js");
module.exports = {
  name: "rank",
  category: "leveling",
  botPerms: ["ATTACH_FILES"],
  async execute(client, cmd) {
    // user you want to see it's rank
    let target = cmd.options.get("user")
      ? cmd.options.get("user").user
      : cmd.user;

    let guildID = cmd.guildId;

    let checkUser = await client.xp.isUser(guildID, target.id);
    let user = await client.xp.getUser(guildID, target.id);
    let userRank = await client.xp.getUserRank(guildID, target.id);

    let avatar = target.displayAvatarURL({ format: "png" });
    let rank = checkUser ? userRank : 0;
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

    cmd.reply({ files: [attachment] });
  },
};
