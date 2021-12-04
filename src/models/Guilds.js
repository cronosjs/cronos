const { Schema, model } = require('mongoose');

module.exports = model(
  "Guilds",
  new Schema(
    {
      guildID: { type: String },
      prefix: { type: String, default: "!" },
      welcomeChannel: { type: String, default: null },
      levelUpChannel: { type: String, default: null },
    },
    { versionKey: false }
  )
);