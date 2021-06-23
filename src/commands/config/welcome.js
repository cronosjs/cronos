const guildDoc = require("../../models/guild");

/**
 * TODO: Add feature so people in welcome message can set where the bot mentions the new user
 * example: c/welcome message Welcome {username} to the server
 * TODO: Posibility to mention channel instead of message.channel 
 * (see line 24) and message.mentions.channels.first() doesn't work
 */
module.exports = {
  name: "welcome",
  userPerms: ["MANAGE_GUILD"],
  async execute(client, message, args, prefix) {
    const cat = args[0]?.toLowerCase();
    const input = args.slice(1).join(" ");

    const sDoc = await guildDoc.findOne({
      _id: message.guild.id,
    });

    if (!cat) return message.reply("Please specify the category");

    if (cat === "channel") {
      let channel = message.channel;

      let channelId = channel.id;

      sDoc.welcome.channel = channelId;

      await sDoc.save().catch((err) => console.log(err));

      return message.reply(`Welcome messages have been set to ${channel}`);
    }

    if (cat === "message") {
      if (!input) return message.reply(`Please insert the message`);
      sDoc.welcome.message = input;

      await sDoc.save().catch((err) => console.log(err));

      return message.reply(`Welcome message has been set to:\n ${input}`);
    }
    if (cat === "image") {
      if (!input) return message.reply(`Please insert the image url`);

      sDoc.welcome.image = input;

      await sDoc.save().catch((err) => console.log(err));

      return message.reply(`Welcome image has been set to:\n ${input}`);
    }
  },
};
