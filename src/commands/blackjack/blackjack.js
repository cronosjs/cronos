let GameManager = require("../../resource/managers/Game.js")
const {MessageEmbed} = require("discord.js");
const {MessageButton, MessageActionRow} = require("discord-buttons");

/**
 * TODO: Add points and eco stuff here
 */

module.exports = {
    name: "blackjack",
    aliases: ["bj"],
    async execute(client, message, args) {
        if (!parseInt(args[0])) {
            return message.channel.send("Invalid bet")
        }

        const bet = Math.ceil(parseInt(args[0]))

        function createFinish(finishObject) {
            return new MessageEmbed()
                .setColor(finishObject.color)
                .setTitle(`Black Jack`)
                .setDescription(`**${finishObject.result.replace("%name%", message.author.username)}**`)
                .addField(message.author.username, `Hand: \`${finishObject.playerHand.join(`\` \``)}\`\nTotal: ${GameManager.getHandTotal(finishObject.playerHand)}`, true)
                .addField(client.user.username, `Hand: \`${finishObject.dealerHand.join(`\` \``)}\`\nTotal: ${GameManager.getHandTotal(finishObject.dealerHand)}`, true)
                .setFooter(`Payout: ${finishObject.payOut}`)
        }

        function createRequestInput(beforeObject) {
            return new MessageEmbed()
                .setColor("#9761f5")
                .setTitle(`Black Jack`)
                .addField(message.author.username, `Hand: \`${beforeObject.playerHand.join(`\` \``)}\`\nTotal: ${GameManager.getHandTotal(beforeObject.playerHand)}`, true)
                .addField(client.user.username, `Hand: \`${beforeObject.dealerHand.join(`\` \``)}\`\nTotal: ${GameManager.getHandTotal(beforeObject.dealerHand)}`, true)
                .setFooter(`Possible moves: ${beforeObject.possibleActions.join(", ")}`)
        }

        const stay = new MessageButton()
            .setStyle(1)
            .setLabel("Stay")
            .setID("stay")

        const hit = new MessageButton()
            .setStyle("green")
            .setLabel("Hit")
            .setID("hit")

        const double = new MessageButton()
            .setStyle("green")
            .setLabel("Double")
            .setID("double")

        const surrender = new MessageButton()
            .setStyle("red")
            .setLabel("Surrender")
            .setID("surrender")

        let defaultButtons = new MessageActionRow().addComponents([stay, hit]);
        let firstOnlyButtons = new MessageActionRow().addComponents([double, surrender]);

        const game = new GameManager(bet)
        let currentState = game.start()

        if (currentState.hasOwnProperty("result")) {
            await message.channel.send({embed: createFinish(currentState)})

        } else {
            let table = await message.channel.send({embed: createRequestInput(currentState), components: [defaultButtons, firstOnlyButtons]})
            async function awaitInput() {
                return new Promise(resolve => {
                    const filter = (button) => button.clicker.user.id === message.author.id;
                    const collector = table.createButtonCollector(filter, {
                        max: 1,
                        time: 30000,
                    });

                    collector.on('collect', collected => {
                        collected.defer()
                        resolve(collected.id)
                    });
                    collector.on('end', collected => {
                        if(collected.size <= 0){
                            message.channel.send("You didn't do anything so you automatically stayed.")
                            resolve("stay")
                        }
                    });
                })
            }
            function resolveInput(){
                awaitInput().then(next => {
                    switch (next) {
                        case "stay":
                            currentState = game.stay()
                            table.edit({embed: createFinish(currentState)})
                            break;
                        case "hit":
                            currentState = game.hit()
                            if (currentState.hasOwnProperty("result")) {
                                table.edit({embed: createFinish(currentState)})
                            } else {
                                table.edit({embed: createRequestInput(currentState), components: [defaultButtons]})
                                resolveInput()
                            }
                            break;
                        case "double":
                            currentState = game.double()
                            table.edit({embed: createFinish(currentState)})
                            break;
                        case "surrender": {
                            currentState = game.surrender()
                            table.edit({embed: createFinish(currentState)})
                            break;
                        }
                    }
                })
            }
            resolveInput()
        }

    }
};