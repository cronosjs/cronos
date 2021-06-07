module.exports = {
    name: "setlevel",
    async execute(client, message, args) {
        let level = args[0];
        let guildID = message.guild.id
        let userID = message.author.id

        let guild = await client.xp.isGuild(guildID)

        if (!guild) await client.xp.createGuild(guildID)

        client.xp.setLevel(guildID, userID, level).then(() => {
            return message.channel.send(`Your level was set to level ${level}`)
        }).catch(async (error) => {
            if (error) {
                let user = await client.xp.createUser(guildID, userID)
                if (user) {
                    client.xp.setLevel(guildID, userID, level).then((result) => {
                        return message.channel.send(`Your level was set to level ${level}`)
                    }).catch((error) => {
                        return message.channel.send(`**Error:** ${error}`)
                    })
                }
            }
        })
    },
};
