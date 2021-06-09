module.exports = {
  name: "addlevel",
  async execute(client, message, args) {
    // levels wanted to add
    let level = message.mentions.users.first()
      ? args.slice(1).join(" ")
      : args[0];

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
        return message.channel.send(done);
      })
      .catch(async (error) => {
        if (error) {
          let user = await client.xp.createUser(guildID, target.id);
          if (user) {
            client.xp
              .addLevel(guildID, target.id, level)
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
