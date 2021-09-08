module.exports = {
  name: "ping",
  async execute(client, cmd) {
    let oldate = new Date().getMilliseconds();
    let newtime = new Date().getMilliseconds() - oldate;

    await cmd.reply("**:ping_pong: Pong!**");
    cmd.editReply(
      ` **:ping_pong: Pong!**\n\n:hourglass: ${
        client.ws.ping
      }ms\n\n:stopwatch: ${
        client.ws.ping + newtime
      }ms\n\n:heartbeat: ${newtime}ms`
    );
  },
};
