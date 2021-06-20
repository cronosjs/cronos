const mongoose = require("mongoose");

const guild = new mongoose.Schema(
  {
    _id: String,
    prefix: String,
    wcChannel: String,
    lvlChannel: String,
    logChannel: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("guild", guild);
