module.exports = async (message, client) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES"))
    return;

  // mentioned bot
  if (message.content.startsWith(`<@!${client.user.id}>`)) {
    return message.channel.send(
      `My prefix in this server is \`${client.prefix}\`\n\nTo get a list of commands, type \`${client.prefix}help\``
    );
  }
};
