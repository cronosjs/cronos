module.exports = {
  name: "setlevel",
  async execute(client, message, args) {
    let level = args[0];

    let guild = client.xp.isGuild(message.guild.id, message.author.id);

    if (guild) {
      let user = client.xp.isUser(message.guild.id, message.author.id);
      if (user) {
        client.xp.setLevel(message.guild.id, message.author.id, level);
        return message.channel.send(`Set your level to ${level}`);
      }
      else {
          client.xp.createUser(message.guild.id, message.author.id);
          client.xp.setLevel(message.guild.id, message.author.id, level);

          return message.channel.send(`Set your level to ${level}`);
      }
    } else {
      client.xp.createGuild(message.guild.id);
      client.xp.createUser(message.guild.id, message.author.id);
      client.xp.setLevel(message.guild.id, message.author.id, level);

      return message.channel.send(`Set your level to ${level}`);
    }

  },
};
