module.exports = {
  name: "resetxp",
  category: "leveling",
  userPerms: ["MANAGE_GUILD"],
  async execute(client, cmd) {
    // user who will lose the xp
    let target = cmd.options.get("user")
      ? cmd.options.get("user").user
      : cmd.user;

    // success message
    let done = cmd.options.get("user")
      ? `Successfully reset **${target.username}**'s xp`
      : `Successfully reset your xp`;

    let guildID = cmd.guildId;

    let guild = await client.xp.isGuild(guildID);
    if (!guild) return cmd.reply("Cri cri... This user doesn't have xp!");

    //check if user wants to reset all xp from the guild
    const { value: all } = cmd.options.get("all");

    if (all) {
      client.xp
        .resetGuild(guildID)
        .then(() => {
          return cmd.reply(`Successfully reset the xp of all users`);
        })
        .catch((error) => {
          return cmd.reply(`**Error:** ${error}`);
        });
    } else {
      let user = await client.xp.isUser(guildID, target.id);
      if (!user) return cmd.reply("Cri cri... This user doesn't have xp");

      client.xp
        .resetUser(guildID, target.id)
        .then(() => {
          return cmd.reply(done);
        })
        .catch((error) => {
          return cmd.reply({
            content: `**Error:** ${error}`,
            ephemeral: true,
          });
        });
    }
  },
};
