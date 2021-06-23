const mongoose = require("mongoose");

const guild = new mongoose.Schema(
  {
    _id: String,
    prefix: String,

    // welcome message
    welcome: {
      channel: String,
      message: String,
      image: String,
    },

    // level up message
    lvl: {
      channel: String,
      message: String,
    },

    // logs channels
    logs: {
      games: Number,
      xp: Number,
      mod: Number,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("guild", guild);
