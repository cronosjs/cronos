module.exports = class guildDelete extends Event {
  constructor() {
    super({
      name: "guildDelete",
      once: false,
    });
  }
  async exec(guild) {
    await this.client.xp.deleteGuild(guild.id);

    const data = {};
    data.guild = await this.client.findGuild({ guildID: guild.id });
    await data.guild
      .delete()
      .catch((err) =>
        this.client.logger.error(
          `An error occurred when trying to trigger guildDelete event.\n${
            err.stack ? err + "\n\n" + err.stack : err
          }`,
          { tag: "guildDelete" }
        )
      );
  }
};
