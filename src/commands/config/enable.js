const guildDoc = require("../../models/guild");

module.exports = {
  name: "enable",
  async execute(client, message, args, prefix) {
    if (!message.member.permissions.has("MANAGE_GUILD")) {
      return message.channel.send("Ey ey ey! You can't use that command");
    }

    // category (channel)
    const cat = args[0]?.toLowerCase();

    // type of channel
    const input = args.slice(1).join(" ");
    const type = input.toLowerCase();

    const sDoc = await guildDoc.findOne({
      Guild: message.guild.id,
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
        let wcCh = sDoc.wcChannel;

        if (wcCh) {
          sDoc.wcChannel = channelId;

          await sDoc.save().catch((err) => console.log(err));

          return message.reply(
            `Welcome messages have been moved in ${channel}\nTo edit the welcome image/message, use ${prefix}edit welcome <message | image>`
          );
        } else {
          sDoc.wcChannel = channelId;

          await sDoc.save().catch((err) => console.log(err));

          return message.reply(
            `Welcome messages have been enabled in ${channel}\nTo edit the welcome image/message, use ${prefix}edit welcome <message | image>`
          );
        }
      } else if (type === "level up") {
        let lvlCh = sDoc.lvlChannel;

        if (lvlCh) {
          sDoc.lvlChannel = channelId;

          await sDoc.save().catch((err) => console.log(err));

          return message.reply(
            `Level up messages have been moved in ${channel}\nTo edit the level up message, use ${prefix}edit levelup <message>`
          );
        } else {
          sDoc.lvlChannel = channelId;

          await sDoc.save().catch((err) => console.log(err));

          return message.reply(
            `Level up messages have been enabled in ${channel}\nTo edit the level up message, use ${prefix}edit levelup <message>`
          );
        }
      }
    }
  },
};
