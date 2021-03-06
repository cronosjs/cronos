module.exports = {
  name: "takexp",
  aliases: ["substractxp"],
  category: "leveling",
  userPerms: ["MANAGE_GUILD"],
  async execute(client, message, args) {
    // xp wanted to substract
    let xp = message.mentions.users.first() ? args.slice(1).join(" ") : args[0];
    if(!xp) return message.reply("Please insert the xp you want to substract")

    // user who will lose the xp
    let target = message.mentions.users.first()
      ? message.mentions.users.first()
      : message.author;

    let guildID = message.guild.id;

    let guild = await client.xp.isGuild(guildID);
    if (!guild) return message.reply("Cri cri... No one has xp in this server!");

    let userID = target.id;

    let user = await client.xp.isUser(guildID, userID);
    if (!user) return message.reply("Cri cri... This user doesn't have xp");

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
      return message.reply(done);
    });
  },
};
