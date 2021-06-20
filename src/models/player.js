const mongoose = require("mongoose");

const player = new mongoose.Schema({
  _id: String,
  Play: Number,
  Win: Number,
  Lose: Number,

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
});

module.exports = mongoose.model("player", player);
