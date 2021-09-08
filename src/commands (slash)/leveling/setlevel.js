module.exports = {
  name: "setlevel",
  category: "leveling",
  userPerms: ["MANAGE_GUILD"],
  async execute(client, message, args) {
    // level wanted
    let level = message.mentions.users.first()
      ? args.slice(1).join(" ")
      : args[0];
    if(!level) return message.reply("Please insert the level you want to set")

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
        return message.reply(done);
      })
      .catch(async (error) => {
        if (error) {
          let user = await client.xp.createUser(guildID, target.id);
          if (user) {
            client.xp
              .setLevel(guildID, target.id, level)
              .then((result) => {
                return message.reply(done);
              })
              .catch((error) => {
                return message.reply(`**Error:** ${error}`);
              });
          }
        }
      });
  },
};
