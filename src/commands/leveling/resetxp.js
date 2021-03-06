module.exports = {
  name: "resetxp",
  category: "leveling",
  userPerms: ["MANAGE_GUILD"],
  async execute(client, message, args) {
    // user who will lose the xp
    let target = message.mentions.users.first()
      ? message.mentions.users.first()
      : message.author;

    // success message
    let done = message.mentions.users.first()
      ? `Successfully reset **${target.username}**'s xp`
      : `Successfully reset your xp`;

    let guildID = message.guild.id;

    let guild = await client.xp.isGuild(guildID);
    if (!guild) return message.reply("Cri cri... No one has xp in this server!");

    //check if user wants to reset all xp from the guild
    const all = args[0]?.toLowerCase();

    if (all === "all") {
      client.xp
        .resetGuild(guildID)
        .then(() => {
          return message.reply(`Successfully reset the xp of all users`);
        })
        .catch((error) => {
          return message.replyd(`**Error:** ${error}`);
        });
    } else {
      let user = await client.xp.isUser(guildID, target.id);
      if (!user) return message.reply("Cri cri... This user doesn't have xp");

      client.xp
        .resetUser(guildID, target.id)
        .then(() => {
          return message.reply(done);
        })
        .catch((error) => {
          return message.reply(`**Error:** ${error}`);
        });
    }
  },
};
