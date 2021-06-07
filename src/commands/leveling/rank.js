
module.exports = {
  name: "rank",
  async execute(client, message, args) {
    
    let user = client.xp.isUser(message.guild.id, message.author.id);
    
    if (user) {
      return message.channel.send(`Your level is ${user.level}`);
    } else {
      return message.channel.send(`Your level is 0 (no db)`);
    }
  },
};
