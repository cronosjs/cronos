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
    await data.guild.delete().then(console.log("fine")).catch(err => console.log(err))
  }
};
