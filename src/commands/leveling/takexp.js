module.exports = {
  name: "takexp",
  aliases: ["substractxp"],
  async execute(client, message, args) {
    if (!message.member.permissions.has("MANAGE_GUILD")) {
      return message.channel.send("Ey ey ey! You can't use that command");
    }

    // xp wanted to substract
    let xp = message.mentions.users.first() ? args.slice(1).join(" ") : args[0];

    // user who will lose the xp
    let target = message.mentions.users.first()
      ? message.mentions.users.first()
      : message.author;

    let guildID = message.guild.id;

    let guild = await client.xp.isGuild(guildID);
    if (!guild) return message.reply();

    let userID = target.id;

    let user = await client.xp.isUser(guildID, userID);
    if (!user) return message.reply();

    // check if xp wanted to substract is bigger than user's xp
    let checkXp = await client.xp.getUser(guildID, userID);

    if (checkXp.xp < xp) {
      xp = checkXp.xp;
    }

    // success message
    let done = message.mentions.users.first()
      ? `Successfully removed **${xp}** xp from **${target.username}**'s xp`
      : `Successfully removed **${xp}** xp from your xp`;

    client.xp.subtractXp(guildID, target.id, xp).then(() => {
      return message.channel.send(done);
    });
  },
};
