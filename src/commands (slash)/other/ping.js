module.exports = {
  name: "ping",
  async execute(client, interaction) {
    let oldate = new Date().getMilliseconds();
    let newtime = new Date().getMilliseconds() - oldate;

    await interaction.reply("**:ping_pong: Pong!**");
    interaction.editReply(
      ` **:ping_pong: Pong!**\n\n:hourglass: ${
        client.ws.ping
      }ms\n\n:stopwatch: ${
        client.ws.ping + newtime
      }ms\n\n:heartbeat: ${newtime}ms`
    );
  },
};
