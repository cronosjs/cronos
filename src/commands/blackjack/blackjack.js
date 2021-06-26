let GameManager = require("./Game.js");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

/**
 * TODO: Add points and eco stuff here
 */

module.exports = {
  name: "blackjack",
  aliases: ["bj"],
  botPerms: ["EMBED_LINKS"],
  async execute(client, message, args) {
    if (!parseInt(args[0])) {
      return message.reply("Invalid bet");
    }

    const bet = Math.ceil(parseInt(args[0]));

    function createFinish(finishObject) {
      return new MessageEmbed()
        .setColor(finishObject.color)
        .setTitle(`Black Jack`)
        .setDescription(
          `**${finishObject.result.replace(
            "%name%",
            message.author.username
          )}**`
        )
        .addField(
          message.author.username,
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
          message.author.username,
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
      await message.channel.send({ embed: createFinish(currentState) });
    } else {
      let table = await message.channel.send({
        embeds: [createRequestInput(currentState)],
        components: [defaultButtons, firstOnlyButtons],
      });
      async function awaitInput() {
        return new Promise((resolve) => {
          const filter = (interaction) =>
            interaction.user.id === message.author.id;
          const collector = table.createMessageComponentInteractionCollector(
            filter,
            {
              max: 1,
              time: 30000,
            }
          );

          collector.on("collect", (collected) => {
            collected.defer();
            resolve(collected.customID);
          });
          collector.on("end", (collected) => {
            if (collected.size <= 0) {
              message.reply(
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
              table.edit({ embed: createFinish(currentState) });
              break;
            case "hit":
              currentState = game.hit();
              if (currentState.hasOwnProperty("result")) {
                table.edit({ embed: createFinish(currentState) });
              } else {
                table.edit({
                  embed: createRequestInput(currentState),
                  components: [defaultButtons],
                });
                resolveInput();
              }
              break;
            case "double":
              currentState = game.double();
              table.edit({ embed: createFinish(currentState) });
              break;
            case "surrender": {
              currentState = game.surrender();
              table.edit({ embed: createFinish(currentState) });
              break;
            }
          }
        });
      }
      resolveInput();
    }
  },
};
