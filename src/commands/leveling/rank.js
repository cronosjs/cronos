const { MessageAttachment } = require("discord.js");

module.exports = class rank extends Command {
  constructor() {
    super({
      name: "rank",
      description: "Shows your current rank.",
      usage: "@user",
      category: "Leveling",
      cooldown: 3000,
      memberPerms: [],
      clientPerms: ["EMBED_LINKS"],
    });
  }
  async exec(message, input, data) {
    let target;
    if (message.mentions.members.first()) {
      target = message.mentions.members.first();
    } else if (!message.mentions.members.first() && input.length > 0) {
      input = input.join(" ");
      if (!isNaN(input)) {
        target = await message.guild.members.fetch(input);
      } else if (input.includes("#")) {
        let n = input.indexOf("#");
        let tag = input.substring(0, n != -1 ? n : input.length);
        await message.guild.members
          .search({ query: tag, limit: 1 })
          .then((find) => (target = find.first()));
      } else {
        await message.guild.members
          .search({ query: input, limit: 1 })
          .then((find) => (target = find.first()));
      }
    } else {
      target = message.member;
    }

    let checkUser = await this.client.xp.isUser(
      message.guild.id,
      target.user.id
    );

    if (checkUser) {
      let avatar = target.displayAvatarURL({ format: "png" });
      let user = await this.client.xp.getUser(message.guild.id, target.user.id);
      let nextXp = await this.client.xp.xpForNext(user.xp).nextLevelXp;
      let userRank = await this.client.xp.getUserRank(
        message.guild.id,
        target.user.id
      );

      let username = target.nickname
        ? `${target.user.username} (${target.nickname})`
        : target.user.username;

      const image = await new this.client.images.rank()
        .setAvatar(avatar)
        .setXP("current", user.xp)
        .setXP("needed", nextXp)
        .setLevel(user.level)
        .setRank(userRank)
        .setReputation(0)
        .setTitle("soon")
        .setUsername(username)
        .toAttachment();

      const attachment = new MessageAttachment(image.toBuffer(), "rank.png");

      message.channel.send({ files: [attachment] });
    } else {
      let attach = message.mentions.members.first()
        ? "./assets/no-xp-user.png"
        : "./assets/no-xp.png";

      message.reply({ files: [attach] });
    }
  }
};
