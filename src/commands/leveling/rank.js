const Discord = require("discord.js");
module.exports = {
  name: "rank",
  async execute(client, message, args) {
    // user who will get the xp
    let target = message.mentions.users.first()
      ? message.mentions.users.first()
      : message.author;

    let guildID = message.guild.id;

    let checkUser = await client.xp.isUser(guildID, target.id);
    let user = await client.xp.getUser(guildID, target.id);

    let avatar = target.displayAvatarURL({ format: "png" });
    let level = checkUser ? user.level : 0;
    let currentXp = checkUser ? user.xp : 0;
    let nextXp = await client.xp.xpForNext(currentXp);

    const image = await new client.images.rank()
      .setAvatar(avatar)
      .setXP("current", currentXp)
      .setXP("needed", nextXp.nextLevelXp)
      .setLevel(level)
      .setRank(1)
      .setReputation(0)
      .setTitle("soon")
      .setUsername(target.username)
      .setBackground(
        "https://cdn.discordapp.com/attachments/841771467149410304/852588834235482162/gradient.png"
      )
      .toAttachment();

    const attachment = new Discord.MessageAttachment(
      image.toBuffer(),
      "rank.png"
    );

    message.channel.send(attachment);
  },
};
