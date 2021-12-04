module.exports = class SlashAddLevel extends Interaction {
  constructor() {
    super({
      name: "addlevel",
      description: "Add levels to someone",
      memberPerms: ["MANAGE_GUILD"],
      clientPerms: [],
      options: [
        {
          type: 4,
          name: "levels",
          description: "The levels you want to add",
          required: true,
        },
        {
          type: 6,
          name: "user",
          description: "The user you want to give levels",
          required: false,
        },
      ],
    });
  }
  async exec(int, data) {
    let level = int.options.getInteger("levels");
    let target = int.options.getMember("user")
      ? int.options.getMember("user")
      : int.member;

    // success message
    let done = int.options.get("user")
      ? `Successfully added **${level}** levels to **${target.username}**'s level`
      : `Successfully added **${level}** levels to your level`;

    let guild = await this.client.xp.isGuild(int.guildId);
    if (!guild) await this.client.xp.createGuild(int.guildId);

    this.client.xp
      .addLevel(int.guildId, target.id, level)
      .then(() => {
        return int.reply(done);
      })
      .catch(async (error) => {
        if (error) {
          let user = await this.client.xp.createUser(int.guildId, target.id);
          if (user) {
            this.client.xp
              .addLevel(int.guildId, target.id, level)
              .then((result) => {
                return int.reply(done);
              })
              .catch((err) => {
                this.client.logger.error(
                  `An error occurred when trying to run addLevel command.\n${
                    err.stack ? err + "\n\n" + err.stack : err
                  }`,
                  { tag: "/addLevel" }
                );
              });
          }
        }
      });
  }
};
