const mongoose = require("mongoose");

const guild = new mongoose.Schema({
  Guild: String,
  Prefix: String,
  wcChannel: String,
  lvlChannel: String,
  logChannel: String,
});

module.exports = mongoose.model("guild", guild);
