const guildDoc = require("../../models/guild");

module.exports = {
  name: "prefix",
  aliases: ["setprefix"],
  async execute(client, message, args) {
    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send("Ey ey ey! You can't use that command");

    const prefix = await args.join(" ");

    if (!prefix) return message.channel.send("Please specify the new prefix");

    const sDoc = await guildDoc.findOne({
      Guild: message.guild.id,
    });

    sDoc.Prefix = prefix;
    await sDoc.save().catch((err) => console.log(err));

    return message.reply(`The prefix has been changed to \`${prefix}\` `);
  },
};
