module.exports = {
  name: "takelevel",
  aliases: ["substractlevel"],
  category: "leveling",
  async execute(client, message, args) {
    if (!message.member.permissions.has("MANAGE_GUILD")) {
      return message.channel.send("Ey ey ey! You can't use that command");
    }

    // levels wanted to add
    let level = message.mentions.users.first()
      ? args.slice(1).join(" ")
      : args[0];

    // user who will get the levels
    let target = message.mentions.users.first()
      ? message.mentions.users.first()
      : message.author;

    let guildID = message.guild.id;

    let guild = await client.xp.isGuild(guildID);
    if (!guild) await client.xp.createGuild(guildID);

    let userID = target.id;

    let user = await client.xp.isUser(guildID, userID);
    if (!user) return message.reply();

    // check if xp wanted to substract is bigger than user's xp
    let checkLvl = await client.xp.getUser(guildID, userID);

    if (checkLvl.level < level) {
      level = checkLvl.level;
    }

    // success message
    let done = message.mentions.users.first()
      ? `Successfully removed **${level}** levels from **${target.username}**'s level`
      : `Successfully removed **${level}** levels from your level`;

    client.xp.subtractLevel(guildID, target.id, level).then(() => {
      return message.channel.send(done);
    });
  },
};
