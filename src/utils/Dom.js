module.exports = {
  addClickEventToButton(identifier, callback) {
    const button = document.querySelector(identifier);
    button.addEventListener("click", callback);
  },
  disableActionButtons() {
    const actionsContainer = document.querySelector(".actions");
    const actionButtons = actionsContainer.querySelectorAll("button");
    actionButtons.forEach(button => button.setAttribute("disabled", "true"));
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
  renderCards(cardsArray, containerElement) {
    cardsArray.forEach(card => {
      containerElement.append(this.generateCard(card));
    });
  },
  standEvent(singleDeckGame) {
    singleDeckGame.standUser();
    singleDeckGame.evaluateUser();

    this.disableActionButtons();
  }
};
