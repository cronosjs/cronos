module.exports = {
  name: "addlevel",
  category: "leveling",
  userPerms: ["MANAGE_GUILD"],
  async execute(client, message, args) {
    // levels wanted to add
    let level = message.mentions.users.first()
      ? args.slice(1).join(" ")
      : args[0];
    if(!level) return message.reply("Please insert the levels you want to add")

    // user who will get the levels
    let target = message.mentions.users.first()
      ? message.mentions.users.first()
      : message.author;

    // success message
    let done = message.mentions.users.first()
      ? `Successfully added **${level}** levels to **${target.username}**'s level`
      : `Successfully added **${level}** levels to your level`;

    let guildID = message.guild.id;

    let guild = await client.xp.isGuild(guildID);
    if (!guild) await client.xp.createGuild(guildID);

    client.xp
      .addLevel(guildID, target.id, level)
      .then(() => {
        return message.reply(done);
      })
      .catch(async (error) => {
        if (error) {
          let user = await client.xp.createUser(guildID, target.id);
          if (user) {
            client.xp
              .addLevel(guildID, target.id, level)
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
