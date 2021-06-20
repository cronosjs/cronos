class Deck {
    constructor() {
        this.cardsTemplate = [
            "A ♣", "2 ♣", "3 ♣", "4 ♣", "5 ♣", "6 ♣", "7 ♣", "8 ♣", "9 ♣", "10 ♣", "J ♣", "Q ♣", "K ♣",
            "A ♦", "2 ♦", "3 ♦", "4 ♦", "5 ♦", "6 ♦", "7 ♦", "8 ♦", "9 ♦", "10 ♦", "J ♦", "Q ♦", "K ♦",
            "A ♥", "2 ♥", "3 ♥", "4 ♥", "5 ♥", "6 ♥", "7 ♥", "8 ♥", "9 ♥", "10 ♥", "J ♥", "Q ♥", "K ♥",
            "A ♠", "2 ♠", "3 ♠", "4 ♠", "5 ♠", "6 ♠", "7 ♠", "8 ♠", "9 ♠", "10 ♠", "J ♠", "Q ♠", "K ♠"
        ]
        this._deck = this.cardsTemplate
        this.shuffle()
    }

    draw(){
        return this._deck.shift();
    }

    shuffle(){
        for (let i = 0; i < 1000; i++)
        {
            let location1 = Math.floor((Math.random() * this._deck.length));
            let location2 = Math.floor((Math.random() * this._deck.length));
            [this._deck[location1], this._deck[location2]] = [this._deck[location2], this._deck[location1]];
        }
    }

    restore(){
        this._deck = this.cardsTemplate
    }
}

module.exports = Deck