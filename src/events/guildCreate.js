const { prefix, support_server } = require("../config.json");
const { MessageEmbed } = require('discord.js')
module.exports = async (guild) => {
  var channel = guild.channels.cache
    .filter((chx) => chx.type === "text")
    .find((x) => x.position === 0);

  let newEmbed = new MessageEmbed()
    .setColor("#9761f5")
    .setTitle(
      "Thanks for inviting me into this server <a:sh_like:812742588439593000>"
    )
    .setDescription(
      `- My default prefix is \`${prefix}\`\r\n\r\n- To change my prefix type \`${prefix}prefix <prefix>\`\r\n\r\n- Type \`${prefix}help\` to get a list of avaliable commands\r\n\r\n- Feel free to join our support server if you need help [Click here!!](\`${support_server}\`)`
    );
  channel.send(newEmbed);
};
