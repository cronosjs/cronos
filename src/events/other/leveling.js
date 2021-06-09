const guildDoc = require("../../models/guild");

module.exports = async (message, client) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES"))
    return;

  // check if guild exists, if not, create it
  let guildID = message.guild.id;

  let guild = await client.xp.isGuild(guildID);
  if (!guild) await client.xp.createGuild(guildID);

  // check if user exists, if not, create it
  let userID = message.author.id;

  let user = await client.xp.isUser(guildID, userID);
  if (!user) await client.xp.createUser(guildID, userID);

  // random xp between 1 - 35
  const randomXp = Math.floor(Math.random() * 34) + 1;

  // add xp to the user
  const addedxp = await client.xp.addXp(guildID, userID, randomXp);

  // check if level up channel is enabled in the guild
  const sDoc = await guildDoc.findOne({
    Guild: message.guild.id,
  });

  if (sDoc) {
    let lvlCh = sDoc.lvlChannel;
    let lvlMsg = sDoc.lvlMessage
      ? sDoc.lvlMessage
      : `${message.author} is now level ${addedxp.newLevel}`;

    if (lvlCh) {
      let channel = client.channels.cache.get(lvlCh);

      // level up message
      if (addedxp.hasLevelUp) {
        return channel.send(lvlMsg);
      }
    }
  }
};
