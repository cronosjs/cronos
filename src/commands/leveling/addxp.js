module.exports = class addXp extends Command {
  constructor() {
    super({
      name: "addxp",
      description: "Add xp to someone",
      usage: "@user <xp>",
      category: "Leveling",
      cooldown: 3000,
      memberPerms: ["MANAGE_GUILD"],
      clientPerms: [],
    });
  }
  async exec(message, input, data) {
    if (!input)
      return message.reply("Please insert the levels you want to add");

    // xp wanted to add
    let xp = message.mentions.users.first() ? input[1] : input[0];

    if (!xp || isNaN(xp)) return message.reply("You have to put actual xp, L!");

    // user who will get the xp
    let target = message.mentions.users.first()
      ? message.mentions.users.first()
      : message.author;

    // success message
    let done = message.mentions.users.first()
      ? `Successfully added **${xp}** xp to **${target.username}**'s xp`
      : `Successfully added **${xp}** xp to your xp`;

    let guild = await client.xp.isGuild(message.guild.id);
    if (!guild) await client.xp.createGuild(message.guild.id);

    this.client.xp
      .addXp(message.guild.id, target.id, xp)
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
              .addXp(message.guild.id, target.id, xp)
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
