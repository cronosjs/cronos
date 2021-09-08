module.exports = {
  name: "addxp",
  category: "leveling",
  userPerms: ["MANAGE_GUILD"],
  async execute(client, cmd) {
    // xp wanted to add
    const { value: xp } = cmd.options.get("amount");
    // user who will get the levels
    let target = cmd.options.get("user") ? cmd.options.get("user").user : cmd.user;

    // success message
    let done = cmd.options.get("user")
      ? `Successfully added **${xp}** xp to **${target.username}**'s xp`
      : `Successfully added **${xp}** xp to your xp`;

    let guildID = cmd.guildId;

    let guild = await client.xp.isGuild(guildID);
    if (!guild) await client.xp.createGuild(guildID);

    client.xp
      .addXp(guildID, target.id, xp)
      .then(() => {
        return cmd.reply(done);
      })
      .catch(async (error) => {
        if (error) {
          let user = await client.xp.createUser(guildID, target.id);
          if (user) {
            client.xp
              .addXp(guildID, target.id, xp)
              .then((result) => {
                return cmd.reply(done);
              })
              .catch((error) => {
                return cmd.reply({
                  content: `**Error:** ${error}`,
                  ephemeral: true,
                });
              });
          }
        }
      });
  },
};
