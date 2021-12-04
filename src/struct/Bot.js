const { Client, Collection, Intents } = require('discord.js');
const { support } = require("../resource/json/config.json");
const { connect, connection: db } = require('mongoose');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const { resolve } = require('path');
const { sync } = require('glob');

require('./Interaction');
require('./Command');
require('./Event');

module.exports = class Bot extends Client {
    constructor() {
        super({
            intents: Object.values(Intents.FLAGS),
            allowedMentions: {
                parse: ['roles', 'users'],
                repliedUser: false,
            },
        });

        this.support = support;

        this.cooldowns = new Collection();
        this.commands = new Collection();
        this.events = new Collection();
        this.aliases = new Collection();
        this.emotes = new Collection();
        this.owners = ["521311050193436682"];
        this.logger = require('../utils/Logger');
        this.interactions = new Collection();

        this.database = {};
        this.guildsData = require('../models/Guilds');
        this.usersData = require("../models/Users");
        this.database.guilds = new Collection();
        this.database.users = new Collection();

        db.on('connected', async () => this.logger.log(`Successfully connected to the database! (Latency: ${Math.round(await this.databasePing())}ms)`, { tag: 'Database' }));
        db.on('disconnected', () => this.logger.error('Disconnected from the database!', { tag: 'Database' }));
        db.on('error', (error) => this.logger.error(`Unable to connect to the database!\nError: ${error}`, { tag: 'Database' }));
        db.on('reconnected', async () => this.logger.log(`Reconnected to the database! (Latency: ${Math.round(await this.databasePing())}ms)`, { tag: 'Database' }));
    }

    /**
     * Checks if the guild has data, if not, it creates it. Returns the guild data.
     * @returns {Promise<Object>}
     */
    async findGuild({ guildID: guildId }, check) {
        if (this.database.guilds.get(guildId)) {
            return check ? this.database.guilds.get(guildId).toJSON() : this.database.guilds.get(guildId);
        } else {
            let guildData = check ? await this.guildsData.findOne({ guildID: guildId }).lean() : await this.guildsData.findOne({ guildID: guildId });
            if (guildData) {
                if (!check) this.database.guilds.set(guildId, guildData);
                return guildData;
            }  else {
                guildData = new this.guildsData({ guildID: guildId });
                await guildData.save();
                this.database.guilds.set(guildId, guildData);
                return check ? guildData.toJSON() : guildData;
            }
        }
    }

    /**
     * Checks if the user has data, if not, it creates it. Returns the user data.
     * @returns {Promise<Object>}
     */
    async findUser({ userID: userId }, check) {
        if (this.database.users.get(userId)) {
            return check ? this.database.users.get(userId).toJSON() : this.database.users.get(userId);
        } else {
            let userData = check ? await this.usersData.findOne({ userID: userId }).lean() : await this.usersData.findOne({ userID: userId });
            if (userData) {
                if (!check) this.database.guilds.set(userId, userData);
                return userData;
            }  else {
                userData = new this.usersData({ userID: userId });
                await userData.save();
                this.database.users.set(userId, userData);
                return check ? userData.toJSON() : userData;
            }
        }
    }


    /**
     * Connects to the database.
     */
    async loadDatabase() {
        return await connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    /**
     * Loads Cronos packages, and sets the bot functions
     * @example this.client.loadCronos();
     */
    async loadCronos() {
        const CronosXp = require("cronos-xp");
        const cronosImg = require("../../cronos-images/src/index");

        const Level = new CronosXp(process.env.MONGO, {
            linear: false, //Default value
            growthMultiplier: 30, //Default value
            returnDetails: true, //Default value
        });
        this.xp = Level;
        this.images = cronosImg;
        this.logger.log("Cronos packages set up!", { tag: "On" });
    }

    /**
     * Get the database ping.
     * @returns {Promise<number>}
     */
    async databasePing() {
        const cNano = process.hrtime();
        await db.db.command({ ping: 1 });
        const time = process.hrtime(cNano);
        return (time[0] * 1e9 + time[1]) * 1e-6;
    }

    /**
     * Loads custom emojis from the bot server.
     */
    async loadEmotes(guild) {
        if (guild) {
            await guild.emojis.fetch().then(emojis => {

                emojis.forEach(e => {
                    if (e.name.includes("_")) {
                        let name = e.name.replace("_", "-")
                        if(e.animated){
                            this.emotes.set(name, `<${e.identifier}>`);
                        } else{
                            this.emotes.set(name, `<:${e.identifier}>`);
                        }
                    } else {
                        if(e.animated){
                            this.emotes.set(e.name, `<${e.identifier}>`);
                        } else{
                            this.emotes.set(e.name, `<:${e.identifier}>`);
                        }
                    }
                })
            })

        }
    }

    /**
     * Loads the bot's commands.
     */
    async loadInteractions(guildId) {
        const intFile = await sync(resolve('./src/interactions/**/*.js'));
        intFile.forEach((filepath) => {
            const File = require(filepath);
            if (!(File.prototype instanceof Interaction)) return;
            const interaction = new File();
            interaction.client = this;
            this.interactions.set(interaction.name, interaction);
            const res = new REST({ version: '9' }).setToken(process.env.TOKEN);
            res.post(Routes.applicationCommands(process.env.CLIENT_ID), { body: interaction });
        })
    }

    /**
     * Loads the bot's text commands
     */
    async loadCommands() {
        const cmdFile = await sync(resolve('./src/commands/**/*.js'));
        cmdFile.forEach((filepath) => {
            const File = require(filepath);
            if (!(File.prototype instanceof Command)) return;
            const command = new File();
            command.client = this;
            this.commands.set(command.name, command);
            command.aliases.forEach((alias) => {
                this.aliases.set(alias, command.name);
            })
        })
    }

    /**
     * Loads the bot's events, and sets the event emitter.
     * @todo Should be improved and divide client events in BaseEvent and other Events in Event
     */
    async loadEvents() {
        const evtFile = await sync(resolve('./src/events/**/*.js'));
        evtFile.forEach((filepath) => {
            const File = require(filepath);
            if (!(File.prototype instanceof Event)) return;
            const event = new File();
            event.client = this;
            this.events.set(event.name, event);
            const emitter = event.emitter ? typeof event.emitter === "string" ? this[event.emitter] : emitter : this;
            emitter[event.type ? "once": "on"](event.name, (...args) => event.exec(...args));
        })
    }

    /* Start the bot */
    async start(token) {
        await this.loadEvents();
        await this.loadCronos();
        await this.loadCommands();
        await this.loadDatabase();
        return super.login(token);
    }
}