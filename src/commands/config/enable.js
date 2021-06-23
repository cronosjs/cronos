const guildDoc = require("../../models/guild");

module.exports = {
  name: "enable",
  userPerms: ["MANAGE_GUILD"],
  async execute(client, message, args, prefix) {
    // category (channel)
    const cat = args[0]?.toLowerCase();

    // type of channel
    const input = args.slice(1).join(" ");
    const type = input.toLowerCase();

    const sDoc = await guildDoc.findOne({
      _id: message.guild.id,
    });

    if (!cat) return message.reply("Please specify the category");

    if (cat === "channel") {
      let channel = message.mentions.channels.first();

      if (!channel) {
        channel = message.channel;
      }

      let channelId = channel.id;
      if (!type) return message.reply("Please specify the type of channel");

      if (type === "welcome") {
        let wcCh = sDoc.welcome.channel;

        if (wcCh) {
          sDoc.welcome.channel = channelId;

          await sDoc.save().catch((err) => console.log(err));

          return message.reply(
            `Welcome messages have been moved in ${channel}\nTo edit the welcome image/message, use ${prefix}edit welcome <message | image>`
          );
        } else {
          sDoc.welcome.channel = channelId;

          await sDoc.save().catch((err) => console.log(err));

          return message.reply(
            `Welcome messages have been enabled in ${channel}\nTo edit the welcome image/message, use ${prefix}edit welcome <message | image>`
          );
        }
      } else if (type === "level up") {
        let lvlCh = sDoc.lvl.channel;

        sDoc.lvl.channel = channelId;
        await sDoc.save().catch((err) => console.log(err));

        let msg = lvlCh
          ? `Level up messages have been moved in ${channel}\nTo edit the level up message, use ${prefix}edit levelup <message>`
          : `Level up messages have been enabled in ${channel}\nTo edit the level up message, use ${prefix}edit levelup <message>`;
        return message.reply(msg);
      }
    }
  },
};
