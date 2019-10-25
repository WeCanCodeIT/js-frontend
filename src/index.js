const {
  default: { singleDeckGame, Result }
} = require("blackjack-dealer-logic");
const Dom = require("./utils/Dom");

Dom.setUpButtonEvents(singleDeckGame, Result);

Dom.startGameLoop(singleDeckGame);
