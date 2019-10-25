module.exports = {
  addClickEventToButton (identifier, callback) {
    const button = document.querySelector(identifier);
    button.addEventListener("click", callback);
  },
  disableActionButtons () {
    const actionsContainer = document.querySelector(".actions");
    const actionButtons = actionsContainer.querySelectorAll("button");
    actionButtons.forEach(button => button.setAttribute("disabled", "true"));
  },
  doubleEvent (singleDeckGame) {
    singleDeckGame.doubleUser();
    userChips.textContent = singleDeckGame.getAnte();
    singleDeckGame.evaluateUser();
    document.querySelector(".user").innerHTML = "";
    this.renderCards(
      singleDeckGame.getUserHand().getCards(),
      document.querySelector(".user")
    );

    this.disableActionButtons()

    // Evaluate User hand
    // If User is bust, they lose
    // if not evaluate dealer hand
    // then find outcome
  },
  generateCard (card) {
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
  hitEvent (singleDeckGame) {
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
  },
  renderCards (cardsArray, containerElement) {
    cardsArray.forEach(card => {
      containerElement.append(this.generateCard(card));
    });
  },
  renderHands (handArray) {
    handArray.forEach(hand => {
      this.renderCards(hand.cards, document.querySelector(hand.container));
    });
  },
  setUpButtonEvents (singleDeckGame) {
    this.addClickEventToButton(".btn--hit", () => {
      this.hitEvent(singleDeckGame);
    });
    this.addClickEventToButton(".btn--double", () => {
      this.doubleEvent(singleDeckGame);
    });
    this.addClickEventToButton(".btn--stand", () => {
      this.standEvent(singleDeckGame);
    });
  },
  setInitialAnte (singleDeckGame) {
    const userChips = document.querySelector(".user-chips");
    const playerAnte = prompt(`
    How much would you like to bet?
    Current chip count: ${singleDeckGame.getUserChips()}
    `);
    userChips.textContent = playerAnte;
    singleDeckGame.receiveAnte(playerAnte);
  },
  standEvent (singleDeckGame) {
    singleDeckGame.standUser();
    singleDeckGame.evaluateUser();

    this.disableActionButtons();

    // evaluate Dealer hand
    // then find outcome
  }
};
