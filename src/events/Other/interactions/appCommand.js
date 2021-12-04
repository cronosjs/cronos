const { formatArray, formatPerms } = require("../../../utils/Utils");
module.exports = class SlashCommands extends Event {
  constructor() {
    super({
      name: "slashCommands",
      once: false,
    });
  }
  async exec(interaction, data) {
    const cmd = this.client.interactions.get(interaction.commandName);
    if (interaction.guild) {
      /* Member permissions */
      const memberCheck = cmd.memberPerms;
      if (memberCheck) {
        const missing = interaction.channel
          .permissionsFor(interaction.member)
          .missing(memberCheck);
        if (missing.length) {
          return interaction.reply({
            content: `You are missing \`${formatArray(
              missing.map(formatPerms)
            )}\` permission.`,
            ephemeral: true,
          });
        }
      }
      /* Client permissions */
      const clientCheck = cmd.clientPerms;
      if (clientCheck) {
        const missing = interaction.channel
          .permissionsFor(interaction.guild.me)
          .missing(clientCheck);
        if (missing.length) {
          return interaction.reply({
            content: `I am missing \`${formatArray(
              missing.map(formatPerms)
            )}\` permission.`,
            ephemeral: true,
          });
        }
      }
    }
    try {
      await cmd.exec(interaction, data);
    } catch (err) {
      interaction.reply({ ephemeral: true, content: "I got an error!" });
      return this.client.logger.error(
        `An error occuredwhile trying to trigger slashCommands\n${
          err.stack ? err + "\n\n" + err.stack : err
        }`,
        {
          tag: "Interaction",
        }
      );
    }
  }
};
