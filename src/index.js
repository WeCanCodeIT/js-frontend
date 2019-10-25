const {
  default: { singleDeckGame, Result }
} = require("blackjack-dealer-logic");
const Dom = require("./utils/Dom");

Dom.setUpButtonEvents(singleDeckGame, Result);

Dom.setInitialAnte(singleDeckGame);

singleDeckGame.deal();

Dom.renderHands([
  {
    cards: [singleDeckGame.getDealerHand().getCards()[0]],
    container: ".dealer"
  },
  { cards: singleDeckGame.getUserHand().getCards(), container: ".user" }
]);
