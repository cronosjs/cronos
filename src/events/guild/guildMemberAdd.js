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
    let wcCh = sDoc.wcChannel;

    if (wcCh) {
      let channel = client.channels.cache.get(wcCh);

      let username = member.user.username;
      let avatar = member.user.displayAvatarURL({ format: "png" });
      let background =
        "https://media.discordapp.net/attachments/841771737666682920/853946945255899136/gradient.png?width=677&height=473";

      let img = await memer.welcome(username, avatar, background);
      let attach = new Discord.MessageAttachment(img, "welcome.png");
      channel.send(attach);
    }
  }
};
