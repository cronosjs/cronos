module.exports = {
  name: "ping",
  async execute(client, message, args, prefix) {
    let oldate = new Date().getMilliseconds();
    let newtime = new Date().getMilliseconds() - oldate;

    message.reply("**:ping_pong: Pong!**").then((m) => {
      m.edit(
        ` **:ping_pong: Pong!**\n\n:hourglass: ${
          client.ws.ping
        }ms\n\n:stopwatch: ${
          client.ws.ping + newtime
        }ms\n\n:heartbeat: ${newtime}ms`
      );
    });
  },
};
