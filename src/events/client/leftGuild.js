const { MessageEmbed } = require("discord.js");
const { bot_logs_channel } = require("../../json/config.json");

module.exports = async (guild, client) => {
  let channel = client.channels.cache.get(bot_logs_channel);

  let webhook = await channel.fetchWebhooks();
  webhook = webhook.find((x) => x.name === "Cronos");

  if (!webhook) {
    webhook = await channel.createWebhook(`Cronos`, {
      avatar: client.user.displayAvatarURL({ format: "png" }),
    });
  }
  await webhook.edit({
    avatar: client.user.displayAvatarURL({ format: "png" }),
  });

  let guildEmbed = new MessageEmbed()
    .setThumbnail(guild.iconURL({ size: 1024, dynamic: true, format: "png" }))
    .setTitle("Left Server")
    .addField("Name", guild.name)
    .addField("Members", guild.memberCount)
    .setFooter(guild.id)
    .setColor("#f64c4c")
    .setTimestamp();

  await webhook.send(guildEmbed);
};
