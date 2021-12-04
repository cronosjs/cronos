const { MessageEmbed } = require("discord.js");
module.exports = class guildCreate extends Event {
  constructor() {
    super({
      name: "guildCreate",
      once: false,
    });
  }
  async exec(guild) {
    await this.client.xp.createGuild(guild.id);

    const data = {};
    data.guild = await this.client.findGuild({ guildID: guild.id });

    this.client.logger.log(`${guild.name} (${guild.id}) just added me!`, {
      tag: "guildCreate",
    });

    var channel = guild.channels.cache
      .filter((chx) => chx.type === "text")
      .find((x) => x.position === 0);

    let emb = new MessageEmbed()
      .setColor("#9761f5")
      .setTitle(
        `Thanks for inviting me into this server ${this.client.emotes.get(
          "welcome"
        )}`
      )
      .setDescription(
        `- My default prefix is \`${data.guild?.prefix}\`\r\n\r\n- To change my prefix type \`${data.guild?.prefix}prefix <prefix>\`\r\n\r\n- Use \`/help\` to get a list of avaliable commands\r\n\r\n- Feel free to join our support server if you need help [Click here!!](\`${this.client.support}\`)`
      );
    channel.send({ embeds: [emb] }).catch((err) => {
      this.client.logger.error(
        `An error occurred when trying to trigger guildCreate event.\n${
          err.stack ? err + "\n\n" + err.stack : err
        }`,
        { tag: "guildCreate" }
      );
    });
  }
};
