module.exports = {
  addClickEventToButton(identifier, callback) {
    const button = document.querySelector(identifier);
    button.addEventListener("click", callback);
  },
  addRestartButtonEventListener() {
    document.body.addEventListener("click", event => {
      if (event.target.classList.contains("play-again")) {
        // TODO finish current hand and start a new one
      }
    });
  },
  disableActionButtons() {
    const actionsContainer = document.querySelector(".actions");
    const actionButtons = actionsContainer.querySelectorAll("button");
    actionButtons.forEach(button => button.setAttribute("disabled", "true"));
  },
  doubleEvent(singleDeckGame, Result) {
    singleDeckGame.doubleUser();
    const userChips = document.querySelector(".user-chips");
    userChips.textContent = singleDeckGame.getAnte();
    singleDeckGame.evaluateUser();
    document.querySelector(".user").innerHTML = "";
    this.renderCards(
      singleDeckGame.getUserHand().getCards(),
      document.querySelector(".user")
    );

    this.disableActionButtons();

    // Evaluate User hand
    // If User is bust, they lose
    // if not evaluate dealer hand
    // then find outcome

    this.standEvent(singleDeckGame, Result);
  },
  generateCard(card) {
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

    return playingCard;
  },
  hitEvent(singleDeckGame, Result) {
    singleDeckGame.hitUser();
    singleDeckGame.evaluateUser();
    document.querySelector(".user").innerHTML = "";
    this.renderCards(
      singleDeckGame.getUserHand().getCards(),
      document.querySelector(".user")
    );

    // Check to see if User is bust
    // if so User loses
    // otherwise keep going
    if (singleDeckGame.isUserBust()) {
      this.standEvent(singleDeckGame, Result);
    }
  },
  renderCards(cardsArray, containerElement) {
    cardsArray.forEach(card => {
      containerElement.append(this.generateCard(card));
    });
  },
  renderHands(handArray) {
    handArray.forEach(hand => {
      this.renderCards(hand.cards, document.querySelector(hand.container));
    });
  },
  renderRestartButton() {
    const restartButton = document.createElement("button");
    restartButton.classList.add("play-again");
    restartButton.textContent = "Play Again!";

    return restartButton;
  },
  setUpButtonEvents(singleDeckGame, Result) {
    this.addClickEventToButton(".btn--hit", () => {
      this.hitEvent(singleDeckGame, Result);
    });
    this.addClickEventToButton(".btn--double", () => {
      this.doubleEvent(singleDeckGame, Result);
    });
    this.addClickEventToButton(".btn--stand", () => {
      this.standEvent(singleDeckGame, Result);
    });
  },
  setInitialAnte(singleDeckGame) {
    const userChips = document.querySelector(".user-chips");
    const playerAnte = prompt(`
    How much would you like to bet?
    Current chip count: ${singleDeckGame.getUserChips()}
    `);
    userChips.textContent = playerAnte;
    singleDeckGame.receiveAnte(playerAnte);

    const chipCountContainer = document.querySelector(".chip-count");
    chipCountContainer.textContent = singleDeckGame.getUserChips();
  },
  standEvent(singleDeckGame, Result) {
    singleDeckGame.standUser();
    singleDeckGame.evaluateUser();

    this.disableActionButtons();

    // evaluate Dealer hand
    singleDeckGame.settleDealerHand();

    const dealerContainer = document.querySelector(".dealer");
    dealerContainer.innerHTML = "";

    this.renderCards(
      singleDeckGame.getDealerHand().getCards(),
      dealerContainer
    );

    singleDeckGame.evaluateDealer();

    // then find outcome
    const resultContainer = document.querySelector(".result");

    const restartButton = this.renderRestartButton();

    resultContainer.append(restartButton);

    this.addRestartButtonEventListener();

    switch (singleDeckGame.outcome()) {
      case Result.WIN:
        resultContainer.innerHTML += " You won!!!";
        break;
      case Result.PUSH:
        resultContainer.innerHTML += " You pushed. Not so bad.";
        break;
      case Result.LOSS:
        resultContainer.innerHTML += " You lost!!!";
        break;

      default:
        break;
    }
  }
};
