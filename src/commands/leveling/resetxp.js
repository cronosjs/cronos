module.exports = class ResetXp extends Command {
  constructor() {
    super({
      name: "resetxp",
      description: "Resets the xp of a user.",
      usage: "<user>",
      category: "Leveling",
      cooldown: 3000,
      memberPerms: ["MANAGE_GUILD"],
      clientPerms: [],
    });
  }
  async exec(message, input, data) {
    // user who will lose the xp
    let target = message.mentions.members.first()
      ? message.mentions.members.first()
      : message.member;

    // success message
    let done = message.mentions.members.first()
      ? `Successfully reset **${target.user.username}**'s xp`
      : `Successfully reset your xp`;

    let guild = await this.client.xp.isGuild(message.guild.id);
    if (!guild)
      return message.reply("Cri cri... No one has xp in this server!");

    if (input[0]?.toLowerCase() === "all") {
      this.client.xp
        .resetGuild(message.guild.id)
        .then(() => {
          return message.reply(`Successfully reset the xp of all users`);
        })
        .catch((err) => {
          this.client.logger.error(
            `An error occurred when trying to trigger resetXp command.\n${
              err.stack ? err + "\n\n" + err.stack : err
            }`,
            { tag: "resetXp" }
          );
          return message.reply(
            `Wait, it seems that my creators spilled coffee on the computer`
          );
        });
    } else {
      let user = await this.client.xp.isUser(message.guild.id, target.id);
      if (!user) return message.reply("Cri cri... This user doesn't have xp");

      this.client.xp
        .resetUser(message.guild.id, target.id)
        .then(() => {
          return message.reply(done);
        })
        .catch((err) => {
          this.client.logger.error(
            `An error occurred when trying to trigger resetXp command.\n${
              err.stack ? err + "\n\n" + err.stack : err
            }`,
            { tag: "resetXp" }
          );
          return message.reply(
            `Wait, it seems that my devs spilled coffee on the computer`
          );
        });
    }
  }
};
