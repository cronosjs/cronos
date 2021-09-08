module.exports = {
  name: "addlevel",
  category: "leveling",
  userPerms: ["MANAGE_GUILD"],
  async execute(client, cmd) {
    // levels wanted to add
    const { value: level } = cmd.options.get("levels");

    // user who will get the levels
    let target = cmd.options.get("user")
      ? cmd.options.get("user").user
      : cmd.user;

    // success message
    let done = cmd.options.get("user")
      ? `Successfully added **${level}** levels to **${target.username}**'s level`
      : `Successfully added **${level}** levels to your level`;

    let guildID = cmd.guildId;

    let guild = await client.xp.isGuild(guildID);
    if (!guild) await client.xp.createGuild(guildID);

    client.xp
      .addLevel(guildID, target.id, level)
      .then(() => {
        return cmd.reply(done);
      })
      .catch(async (error) => {
        if (error) {
          let user = await client.xp.createUser(guildID, target.id);
          if (user) {
            client.xp
              .addLevel(guildID, target.id, level)
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
