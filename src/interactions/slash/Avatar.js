const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = class Avatar extends Interaction {
  constructor() {
    super({
      name: "avatar",
      description: "Gets Avatar",
      options: [
        {
          type: 6,
          name: "user",
          description: "User you want to see it's avatar.",
          required: false,
        },
      ],
    });
  }
  async exec(int, data) {
    let target = int.options.getUser("user") ? int.options.getUser("user") : int.member;
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setURL(target.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setLabel("Show")
    );
    int.reply({
      content: `${target.displayAvatarURL({ dynamic: true, size: 4096 })}`,
      components: [row],
    });
  }
};
