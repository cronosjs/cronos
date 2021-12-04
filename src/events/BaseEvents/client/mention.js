module.exports = class messageCreate extends Event {
  constructor() {
    super({
      name: "messageCreate",
      once: false,
    });
  }
  async exec(message) {
    /* If author is bot or if message isn't in guild return */
    if (message.author.bot || !message.guild) return;
    const data = {};
    /* If message is in guild we return the findGuild and findUser function */
    if (message.guild) {
      data.guild = await this.client.findGuild({ guildID: message.guild.id });
    }

    if (message.content === `<@!${this.client.user.id}>`) {
      return message.reply(
        `My prefix in this server is \`${data.guild?.prefix}\`\n\nTo get a list of commands, use \`/help\``
      );
    }
  }
};
