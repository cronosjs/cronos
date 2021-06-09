const guildDoc = require("../models/guild");
const Meme = require("memer-api");
const memer = new Meme("8EqDoDv8ZfI");
const Discord = require("discord.js");

module.exports = async (member, client) => {
  const sDoc = await guildDoc.findOne({
    Guild: member.guild.id,
  });

  if (sDoc) {
    let wcCh = sDoc.wcChannel;

    if (wcCh) {
      let channel = client.channels.cache.get(wcCh);

      let username = member.user.username;
      let avatar = member.user.displayAvatarURL({ format: "png" });
      let background =
        "https://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-hero.jpg";

      let img = await memer.welcome(username, avatar, background);
      let attach = new Discord.MessageAttachment(img, "welcome.png");
      channel.send(attach);
    }
  }
};
