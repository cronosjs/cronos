module.exports = class Ping extends Interaction {
    constructor() {
        super({
            name: "ping",
            description: "Ping command",
        });
    }
    async exec(int, data) {
        int.reply({ ephemeral: true, content: [
            `**:ping_pong: Pong!**`,
            `:heart: My latency - **${Math.round(int.createdTimestamp - Date.now())}**ms`,
            `:computer: Discord latency - **${Math.round(this.client.ws.ping)}**ms`,
            `:computer: Database latency - **${Math.round(await this.client.databasePing())}**ms`,
        ].join('\n')});
    }
}