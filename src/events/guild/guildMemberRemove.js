module.exports = async (member, client) => {
  let guildID = member.guild.id;

  let user = await client.xp.isUser(guildID, member.id);
  if (user) await client.xp.deleteUser(guildID, member.id);
};
