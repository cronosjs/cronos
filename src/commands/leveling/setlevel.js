module.exports = {
  name: "setlevel",
  category: "leveling",
  userPerms: ["MANAGE_GUILD"],
  async execute(client, message, args) {
    // level wanted
    let level = message.mentions.users.first()
      ? args.slice(1).join(" ")
      : args[0];

    // user who will get the levels
    let target = message.mentions.users.first()
      ? message.mentions.users.first()
      : message.author;

    // success message
    let done = message.mentions.users.first()
      ? `Successfully set **${target.username}** to level **${level}**`
      : `Successfully set your level to **${level}**`;

    let guildID = message.guild.id;

    let guild = await client.xp.isGuild(guildID);
    if (!guild) await client.xp.createGuild(guildID);

    client.xp
      .setLevel(guildID, target.id, level)
      .then(() => {
        return message.channel.send(done);
      })
      .catch(async (error) => {
        if (error) {
          let user = await client.xp.createUser(guildID, target.id);
          if (user) {
            client.xp
              .setLevel(guildID, target.id, level)
              .then((result) => {
                return message.channel.send(done);
              })
              .catch((error) => {
                return message.channel.send(`**Error:** ${error}`);
              });
          }
        }
      });
  },
};
