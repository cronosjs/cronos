module.exports = {
  name: "takelevel",
  aliases: ["substractlevel"],
  category: "leveling",
  userPerms: ["MANAGE_GUILD"],
  async execute(client, message, args) {
    // levels wanted to substract
    let level = message.mentions.users.first()
      ? args.slice(1).join(" ")
      : args[0];
    if (!level)
      return message.reply("Please insert the levels you want to substract");

    // user who will lose the levels
    let target = message.mentions.users.first()
      ? message.mentions.users.first()
      : message.author;

    let guildID = message.guild.id;

    let guild = await client.xp.isGuild(guildID);
    if (!guild)
      return message.reply("Cri cri... No one has xp in this server!");

    let userID = target.id;

    let user = await client.xp.isUser(guildID, userID);
    if (!user) return message.reply("Cri cri... This user doesn't have xp");

    // check if levels wanted to substract is bigger than user's level
    let checkLvl = await client.xp.getUser(guildID, userID);

    if (checkLvl.level < level) {
      level = checkLvl.level;
    }

    // success message
    let done = message.mentions.users.first()
      ? `Successfully removed **${level}** levels from **${target.username}**'s level`
      : `Successfully removed **${level}** levels from your level`;

    client.xp.subtractLevel(guildID, target.id, level).then(() => {
      return message.reply(done);
    });
  },
};
