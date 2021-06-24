require("dotenv").config({ path: "src/.env" });

const chalk = require("chalk");
const CronosXp = require("cronos-xp");
const cronosImg = require("../cronos-images/src/index");

const { prefix, support_server } = require("./json/config.json");
const { Client, Collection, Intents } = require("discord.js");

const { loadCommands } = require("./utilities/loadcmds.js");
const { loadEmojis } = require("./utilities/loademojis.js");
const { loadEvents } = require("./utilities/loadevents.js");
const { nodeEvents } = require("./utilities/nodeevents.js");

const client = new Client({
  allowedMentions: { parse: ["users", "roles"] },
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

const Level = new CronosXp(process.env.mongo_url, {
  linear: false, //Default value
  growthMultiplier: 30, //Default value
  returnDetails: true, //Default value
});

client.login(process.env.main_token).then(() => {
  console.log(
    chalk.bgBlueBright.black(
      ` Successfully logged in as: ${client.user.username}#${client.user.discriminator} `
    )
  );
});

client.xp = Level;
client.images = cronosImg;
client.prefix = prefix;
client.support = support_server;
client.myemojis = new Collection();
client.commands = new Collection();

loadCommands(client);
loadEvents(client);
loadEmojis(client);
nodeEvents(process);
