module.exports = {
  name: "rank",
  async execute(client, message, args) {
    let guildID = message.guild.id;
    let userID = message.author.id;

    let user = await client.xp.getUser(guildID, userID);

    return message.channel.send(`Your level is ${user.level}`);
  },
};
