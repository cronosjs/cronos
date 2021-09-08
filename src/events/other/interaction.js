module.exports = async (interaction, client) => {
  if (!interaction.isCommand()) return;
  const commandName = interaction.commandName;

  const command = client.slash.get(commandName);

  // user permissions handler
  if (!interaction.member.permissions.has(command.userPerms || []))
    return interaction.reply({
      content: "Ey ey ey! You can't use that command",
      ephemeral: true,
    });

  try {
    // async execute(client, cmd)
    command.execute(client, interaction);
  } catch (error) {
    console.error(error);
    interaction
      .reply({
        content: "There was an error executing that command.",
        ephemeral: true,
      })
      .catch(console.error);
  }
};
