module.exports = {
  name: "setxp",
  async execute(client, message, args) {
    // xp wanted to set
    let xp = message.mentions.users.first() ? args.slice(1).join(" ") : args[0];

    // user who will get the xp
    let target = message.mentions.users.first()
      ? message.mentions.users.first()
      : message.author;

    // success message
    let done = message.mentions.users.first()
      ? `Successfully set **${target.username}**'s xp to **${xp}**`
      : `Successfully set your xp to **${xp}**`;

    let guildID = message.guild.id;

    let guild = await client.xp.isGuild(guildID);
    if (!guild) await client.xp.createGuild(guildID);

    client.xp
      .setXp(guildID, target.id, xp)
      .then(() => {
        return message.channel.send(done);
      })
      .catch(async (error) => {
        if (error) {
          let user = await client.xp.createUser(guildID, target.id);
          if (user) {
            client.xp
              .setXp(guildID, target.id, xp)
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
