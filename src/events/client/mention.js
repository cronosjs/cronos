const guildDoc = require("../../models/guild");

module.exports = async (message, client) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES"))
    return;

  const sDoc = await guildDoc.findOne({
    _id: message.guild.id,
  });

  let p = sDoc ? sDoc.prefix : client.prefix;

  
  // mentioned bot
  if (message.content.startsWith(`<@!${client.user.id}>`)) {
    return message.channel.send(
      `My prefix in this server is \`${p}\`\n\nTo get a list of commands, type \`${p}help\``
    );
  }
};
