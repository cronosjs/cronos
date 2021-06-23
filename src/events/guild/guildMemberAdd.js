const guildDoc = require("../../models/guild");
const Meme = require("memer-api");
const memer = new Meme("8EqDoDv8ZfI");
const Discord = require("discord.js");

module.exports = async (member, client) => {
  let guildID = member.guild.id;

  let guild = await client.xp.isGuild(guildID);
  if (!guild) await client.xp.createGuild(guildID);

  await client.xp.createUser(guildID, member.id);

  const sDoc = await guildDoc.findOne({
    _id: member.guild.id,
  });

  if (sDoc) {
    let wcCh = sDoc.welcome.channel;
    let message = sDoc.welcome.message;
    let image = sDoc.welcome.image;

    if (wcCh) {
      let channel = client.channels.cache.get(wcCh);
      if (message && !image) {
        channel.send(message);
      }

      if (!message && image) {
        let username = member.user.username;
        let avatar = member.user.displayAvatarURL({ format: "png" });
        let background = image;

        let img = await memer.welcome(username, avatar, background);
        let attach = new Discord.MessageAttachment(img, "welcome.png");
        channel.send(attach);
      }

      if (message && image) {
        let username = member.user.username;
        let avatar = member.user.displayAvatarURL({ format: "png" });
        let background = image;

        let img = await memer.welcome(username, avatar, background);
        let attach = new Discord.MessageAttachment(img, "welcome.png");
        channel.send(message, attach);
      }
    }
  }
};
