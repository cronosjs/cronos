module.exports = {
  name: "cronos",
  async execute(client, cmd) {
    await cmd.reply(
      `To get a list of commands, use \`/help\`\n\nInvite me [here](${client.invite})\n\nIf you need help join our support server [here](${client.support})`
    );
  },
};
