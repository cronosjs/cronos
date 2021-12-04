module.exports = class AddLevel extends Command {
  constructor() {
    super({
      name: "addlevel",
      description: "Add levels to someone",
      usage: "@user <levels>",
      category: "Leveling",
      cooldown: 3000,
      memberPerms: ["MANAGE_GUILD"],
      clientPerms: [],
    });
  }
  async exec(message, input, data) {
    if (!input)
      return message.reply("Please insert the levels you want to add");

    // levels wanted to add
    let level = message.mentions.users.first()
      ? input.slice(1).join(" ")
      : input[0];

    if (!level || isNaN(level))
      return message.reply("You have to put actual levels, L!");

    // user who will get the levels
    let target = message.mentions.users.first()
      ? message.mentions.users.first()
      : message.author;

    // success message
    let done = message.mentions.users.first()
      ? `Successfully added **${level}** levels to **${target.username}**'s level`
      : `Successfully added **${level}** levels to your level`;

    let guild = await this.client.xp.isGuild(message.guild.id);
    if (!guild) await this.client.xp.createGuild(message.guild.id);

    this.client.xp
      .addLevel(message.guild.id, target.id, level)
      .then(() => {
        return message.reply(done);
      })
      .catch(async (error) => {
        if (error) {
          let user = await this.client.xp.createUser(
            message.guild.id,
            target.id
          );
          if (user) {
            this.client.xp
              .addLevel(message.guild.id, target.id, level)
              .then((result) => {
                return message.reply(done);
              })
              .catch((err) => {
                this.client.logger.error(
                  `An error occurred when trying to run addLevel command.\n${
                    err.stack ? err + "\n\n" + err.stack : err
                  }`,
                  { tag: "addLevel" }
                );
              });
          }
        }
      });
  }
};
