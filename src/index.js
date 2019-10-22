const {
  default: { singleDeckGame }
} = require("blackjack-dealer-logic");

singleDeckGame.deal();

const userHand = singleDeckGame.getUserHand();

generateCard(userHand.getCards()[0]);
generateCard(userHand.getCards()[1]);

function generateCard(card) {
  const playingCard = document.createElement("section");
  playingCard.classList.add("playing-card");

  const valueContainer = document.createElement("section");
  valueContainer.classList.add("value-container");

  const value = document.createElement("span");
  value.classList.add("value");
  value.textContent = card.getValue();

  const suit = document.createElement("span");
  suit.classList.add("suit");
  suit.textContent = card.getSuit();

  valueContainer.append(value);
  valueContainer.append(suit);
  playingCard.append(valueContainer);

  const table = document.querySelector(".table");
  table.append(playingCard);
}
