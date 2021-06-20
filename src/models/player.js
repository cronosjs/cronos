const mongoose = require("mongoose");

const player = new mongoose.Schema(
  {
    _id: String,
    play: Number,
    win: Number,
    lose: Number,

    // Blackjack stats
    blackJack: {
      play: Number,
      win: Number,
      lose: Number,
    },

    // Tic Tac Toe stats
    ticTacToe: {
      play: Number,
      win: Number,
      lose: Number,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("player", player);
