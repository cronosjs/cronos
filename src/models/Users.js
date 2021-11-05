const { Schema, model } = require("mongoose");

module.exports = model(
  "User",
  new Schema(
    {
      userID: { type: String },
      // game stats
      games: {
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

      // command usage stats
      commands: {
        total: Number,
      },
    },
    { versionKey: false }
  )
);
