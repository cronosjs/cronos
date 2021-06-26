let GameManager = require("./Game.js");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "blackjack",
  async execute(client, cmd) {
    const { value: integer } = cmd.options.get("bet");
    const bet = integer;

    function createFinish(finishObject) {
      return new MessageEmbed()
        .setColor(finishObject.color)
        .setTitle(`Black Jack`)
        .setDescription(
          `**${finishObject.result.replace("%name%", cmd.user.username)}**`
        )
        .addField(
          cmd.user.username,
          `Hand: \`${finishObject.playerHand.join(
            `\` \``
          )}\`\nTotal: ${GameManager.getHandTotal(finishObject.playerHand)}`,
          true
        )
        .addField(
          client.user.username,
          `Hand: \`${finishObject.dealerHand.join(
            `\` \``
          )}\`\nTotal: ${GameManager.getHandTotal(finishObject.dealerHand)}`,
          true
        )
        .setFooter(`Payout: ${finishObject.payOut}`);
    }

    function createRequestInput(beforeObject) {
      return new MessageEmbed()
        .setColor("#9761f5")
        .setTitle(`Black Jack`)
        .addField(
          cmd.user.username,
          `Hand: \`${beforeObject.playerHand.join(
            `\` \``
          )}\`\nTotal: ${GameManager.getHandTotal(beforeObject.playerHand)}`,
          true
        )
        .addField(
          client.user.username,
          `Hand: \`${beforeObject.dealerHand.join(
            `\` \``
          )}\`\nTotal: ${GameManager.getHandTotal(beforeObject.dealerHand)}`,
          true
        );
    }

    const stay = new MessageButton()
      .setStyle(1)
      .setLabel("Stand")
      .setCustomID("stay");

    const hit = new MessageButton()
      .setStyle(3)
      .setLabel("Hit")
      .setCustomID("hit");

    const double = new MessageButton()
      .setStyle(3)
      .setLabel("Double")
      .setCustomID("double");

    const surrender = new MessageButton()
      .setStyle(4)
      .setLabel("Surrender")
      .setCustomID("surrender");

    let defaultButtons = new MessageActionRow().addComponents([stay, hit]);
    let firstOnlyButtons = new MessageActionRow().addComponents([
      double,
      surrender,
    ]);

    const game = new GameManager(bet);
    let currentState = game.start();

    if (currentState.hasOwnProperty("result")) {
      await cmd.reply({ embeds: [createFinish(currentState)] });
    } else {
      let table = await cmd.reply({
        embeds: [createRequestInput(currentState)],
        components: [defaultButtons, firstOnlyButtons],
      });

      table = await cmd.fetchReply();

      async function awaitInput() {
        return new Promise((resolve) => {
          const filter = (interaction) => interaction.user.id === cmd.user.id;
          const collector = table.createMessageComponentInteractionCollector(
            filter,
            {
              max: 1,
              time: 30000,
            }
          );

          collector.on("collect", (collected) => {
            resolve(collected.customID);
            collected.reply(client.myemojis.get("invisible"))
            collected.deleteReply();
            ;
          });
          collector.on("end", (collected) => {
            if (collected.size <= 0) {
              cmd.channel.send(
                "You didn't do anything so you automatically stand."
              );
              resolve("stay");
            }
          });
        });
      }
      function resolveInput() {
        awaitInput().then((next) => {
          switch (next) {
            case "stay":
              currentState = game.stay();
              cmd.editReply({
                embeds: [createFinish(currentState)],
                components: [],
              });
              break;
            case "hit":
              currentState = game.hit();
              if (currentState.hasOwnProperty("result")) {
                cmd.editReply({
                  embeds: [createFinish(currentState)],
                  components: [],
                });
              } else {
                cmd.editReply({
                  embeds: [createRequestInput(currentState)],
                  components: [defaultButtons],
                });
                resolveInput();
              }
              break;
            case "double":
              currentState = game.double();
              cmd.editReply({ embeds: [createFinish(currentState)] });
              break;
            case "surrender": {
              currentState = game.surrender();
              cmd.editReply({
                embeds: [createFinish(currentState)],
                components: [],
              });
              break;
            }
          }
        });
      }
      resolveInput();
    }
  },
};
