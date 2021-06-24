module.exports = {
  name: "addxp",
  category: "leveling",
  userPerms: ["MANAGE_GUILD"],
  async execute(client, message, args) {
    // xp wanted to add
    let xp = message.mentions.users.first() ? args.slice(1).join(" ") : args[0];
    if(!xp) return message.reply("Please insert the xp you want to add")
    // user who will get the xp
    let target = message.mentions.users.first()
      ? message.mentions.users.first()
      : message.author;

    // success message
    let done = message.mentions.users.first()
      ? `Successfully added **${xp}** xp to **${target.username}**'s xp`
      : `Successfully added **${xp}** xp to your xp`;

    let guildID = message.guild.id;

    let guild = await client.xp.isGuild(guildID);
    if (!guild) await client.xp.createGuild(guildID);

    client.xp
      .addXp(guildID, target.id, xp)
      .then(() => {
        return message.reply(done);
      })
      .catch(async (error) => {
        if (error) {
          let user = await client.xp.createUser(guildID, target.id);
          if (user) {
            client.xp
              .addXp(guildID, target.id, xp)
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
