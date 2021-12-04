module.exports = class Set extends Command {
    constructor() {
        super({
          name: "set",
          usage: "<setting> <value>",
          description: "Sets a setting for the bot.",
          category: "admin",
          cooldown: 3000,
          memberPerms: ["MANAGE_GUILD"],
          clientPerms: [],
        });

    }
}