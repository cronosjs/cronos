const guildDoc = require("../../models/guild");

module.exports = async (guild, client) => {
  await client.xp.deleteGuild(guild.id);

  await guildDoc.findOneAndDelete({ Guild: guild.id });
};
