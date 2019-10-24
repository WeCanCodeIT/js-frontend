const {
  default: { singleDeckGame, Result }
} = require("blackjack-dealer-logic");
const Dom = require("./utils/Dom");

const userChips = document.querySelector(".user-chips")
const playerAnte = prompt(
  `
  How much would you like to bet?
  Current chip count: ${singleDeckGame.getUserChips()}
  `
)
userChips.textContent = playerAnte
singleDeckGame.receiveAnte(playerAnte)

singleDeckGame.deal();

const dealerHand = singleDeckGame.getDealerHand();
const userHand = singleDeckGame.getUserHand();

Dom.renderCards([dealerHand.getCards()[1]], document.querySelector(".dealer"));
Dom.renderCards(userHand.getCards(), document.querySelector(".user"));

const hitButton = document.querySelector(".btn--hit");

hitButton.addEventListener("click", () => {
  singleDeckGame.hitUser();
  singleDeckGame.evaluateUser()
  document.querySelector(".user").innerHTML = "";
  Dom.renderCards(
    singleDeckGame.getUserHand().getCards(),
    document.querySelector(".user")
  );
});

const doubleButton = document.querySelector('.btn--double')

doubleButton.addEventListener("click", () => {
  singleDeckGame.doubleUser();
  userChips.textContent = singleDeckGame.getAnte()
  singleDeckGame.evaluateUser()
  document.querySelector(".user").innerHTML = "";
  Dom.renderCards(
    singleDeckGame.getUserHand().getCards(),
    document.querySelector(".user")
  );

  const actionsContainer = document.querySelector(".actions")
  const actionButtons = actionsContainer.querySelectorAll("*")
  actionButtons.forEach(button => button.setAttribute("disabled", "true"))
});

const standButton = document.querySelector('.btn--stand')

standButton.addEventListener("click", () => {
  singleDeckGame.standUser();
  singleDeckGame.evaluateUser()

  const actionsContainer = document.querySelector(".actions")
  const actionButtons = actionsContainer.querySelectorAll("*")
  actionButtons.forEach(button => button.setAttribute("disabled", "true"))
});
