const guildDoc = require("../../models/guild");

module.exports = {
  name: "prefix",
  aliases: ["setprefix"],
  userPerms: ["MANAGE_GUILD"],
  async execute(client, message, args) {
    const prefix = await args.join(" ");

    if (!prefix) return message.channel.send("Please specify the new prefix");

    const sDoc = await guildDoc.findOne({
      _id: message.guild.id,
    });

    sDoc.prefix = prefix;
    await sDoc.save().catch((err) => console.log(err));

    return message.reply(`The prefix has been changed to \`${prefix}\` `);
  },
};
