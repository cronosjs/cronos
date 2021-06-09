const guildDoc = require("../models/guild");
const { MessageEmbed } = require("discord.js");

module.exports = async (guild, client) => {

  await client.xp.createGuild(guild.id);

  const sb = new guildDoc({
    Guild: guild.id,
    Prefix: client.prefix,
  });

  await sb.save().catch((err) => console.log(err));

  var channel = guild.channels.cache
    .filter((chx) => chx.type === "text")
    .find((x) => x.position === 0);

  let newEmbed = new MessageEmbed()
    .setColor("#9761f5")
    .setTitle(`Thanks for inviting me into this server ${client.myemojis.get("welcome")}`)
    .setDescription(
      `- My default prefix is \`${client.prefix}\`\r\n\r\n- To change my prefix type \`${client.prefix}prefix <prefix>\`\r\n\r\n- Type \`${client.prefix}help\` to get a list of avaliable commands\r\n\r\n- Feel free to join our support server if you need help [Click here!!](\`${client.support}\`)`
    );
  channel.send(newEmbed);
};
