global.BaseEvent = module.exports = class Event extends BaseEvent {
    constructor(options) {
        this.name = options.name || "";
        this.type = options.once || false;
        this.main = options.main
    }

    async exec(...args) {
        throw new Error(`${this.name} does not provide exec method !`);
    }
}