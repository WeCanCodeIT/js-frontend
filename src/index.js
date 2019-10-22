const { Table, User, Dealer } = require("blackjack-dealer-logic");
import { standardDeck } from "playing-card-deck-generator";

const gameTable = new Table(new User(), new Dealer(standardDeck));

// index.singleDeckGame.deal();
gameTable.deal();

console.log(gameTable.getUserHand());

const playingCard = document.createElement("section");
playingCard.classList.add("playing-card");

const valueContainer = document.createElement("section");
valueContainer.classList.add("value-container");

const value = document.createElement("span");
value.classList.add("value");

const suit = document.createElement("span");
suit.classList.add("suit");

valueContainer.append(value);
valueContainer.append(suit);
playingCard.append(valueContainer);

const table = document.querySelector(".table");
table.append(playingCard);
