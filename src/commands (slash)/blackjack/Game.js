const Deck = require("../../resource/decks/FrenchDeck.js");

colors = {
  win: "#1de031",
  draw: "#e58d0d",
  lose: "#d54646",
};

class GameManager {
  constructor(bet) {
    this.bet = bet;
    this.deck = new Deck();
    this.playerHand = [];
    this.dealerHand = [];
  }

  start() {
    this.playerHand.push(this.deck.draw());
    this.playerHand.push(this.deck.draw());
    this.dealerHand.push(this.deck.draw());

    const possibleActions = ["stay", "hit"];

    if (GameManager.#checkBlackjack(this.playerHand)) {
      this.#dealersTurn();
      if (GameManager.#checkBlackjack(this.dealerHand)) {
        return {
          result: "Instant draw due to Black Jack!",
          color: colors.draw,
          payOut: this.bet,
          playerHand: this.playerHand,
          dealerHand: this.dealerHand,
        };
      } else {
        return {
          result: "Instant win due to Black Jack!",
          color: colors.win,
          payOut: this.bet * 2.5,
          playerHand: this.playerHand,
          dealerHand: this.dealerHand,
        };
      }
    }

    possibleActions.push("double", "surrender");

    return {
      // waiting for further action
      possibleActions: possibleActions,
      playerHand: this.playerHand,
      dealerHand: this.dealerHand,
    };
  }

  hit() {
    this.playerHand.push(this.deck.draw());

    let handTotal = GameManager.getHandTotal(this.playerHand);
    if (handTotal >= 21) {
      return this.#finishGame();
    }

    return {
      // waiting for further action
      possibleActions: ["stay", "hit"],
      playerHand: this.playerHand,
      dealerHand: this.dealerHand,
    };
  }

  stay() {
    return this.#finishGame();
  }

  surrender() {
    if (this.playerHand.length !== 2) return "Invalid action";
    return {
      result: "%name% has surrendered!",
      color: colors.lose,
      payOut: this.bet * 0.5,
      playerHand: this.playerHand,
      dealerHand: this.dealerHand,
    };
  }

  double() {
    if (this.playerHand.length !== 2) return "Invalid action";
    this.bet = this.bet * 2;
    this.playerHand.push(this.deck.draw());
    return this.#finishGame();
  }

  #finishGame() {
    if (GameManager.getHandTotal(this.playerHand) >= 22) {
      return {
        result: "%name% busted!",
        color: colors.lose,
        payOut: 0,
        playerHand: this.playerHand,
        dealerHand: this.dealerHand,
      };
    }
    this.#dealersTurn();
    if (GameManager.#checkBlackjack(this.dealerHand)) {
      return {
        result: "%name% lost!",
        color: colors.lose,
        payOut: 0,
        playerHand: this.playerHand,
        dealerHand: this.dealerHand,
      };
    }
    if (GameManager.getHandTotal(this.dealerHand) >= 22) {
      return {
        result: "%name% won!",
        color: colors.win,
        payOut: this.bet * 2,
        playerHand: this.playerHand,
        dealerHand: this.dealerHand,
      };
    }
    if (
      GameManager.getHandTotal(this.playerHand) ===
      GameManager.getHandTotal(this.dealerHand)
    ) {
      return {
        result: "Draw!",
        color: colors.draw,
        payOut: this.bet,
        playerHand: this.playerHand,
        dealerHand: this.dealerHand,
      };
    }
    if (
      GameManager.getHandTotal(this.playerHand) >
      GameManager.getHandTotal(this.dealerHand)
    ) {
      return {
        result: "%name% won!",
        color: colors.win,
        payOut: this.bet * 2,
        playerHand: this.playerHand,
        dealerHand: this.dealerHand,
      };
    } else {
      return {
        result: "%name% lost!",
        color: colors.lose,
        payOut: 0,
        playerHand: this.playerHand,
        dealerHand: this.dealerHand,
      };
    }
  }

  #dealersTurn() {
    while (GameManager.getHandTotal(this.dealerHand) <= 16) {
      this.dealerHand.push(this.deck.draw());
    }
  }

  static #checkBlackjack(hand) {
    return (
      (hand[0].startsWith("A") &&
        (hand[1].startsWith("1") ||
          hand[1].startsWith("J") ||
          hand[1].startsWith("Q") ||
          hand[1].startsWith("K"))) ||
      ((hand[1].startsWith("1") ||
        hand[0].startsWith("J") ||
        hand[0].startsWith("Q") ||
        hand[0].startsWith("K")) &&
        hand[1].startsWith("A"))
    );
  }

  static getHandTotal(hand) {
    let total = 0;
    let aces = 0;
    let values = {
      A: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      1: 10,
      J: 10,
      Q: 10,
      K: 10,
    };
    hand.forEach((card) => {
      card = card.charAt(0);
      total += values[card];
      if (card === "A") aces += 1;
    });
    for (let i = 0; i < aces; i++) {
      if (total <= 11) {
        total += 10;
      } else {
        break;
      }
    }
    return total;
  }
}

module.exports = GameManager;
