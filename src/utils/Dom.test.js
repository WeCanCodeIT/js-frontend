const Dom = require("./Dom");

describe("Dom", () => {
  describe("addClickEventButton", () => {
    test("should add a click event to a given button", () => {
      // Arrange
      const testButton = document.createElement("button");
      testButton.classList.add("btn--test");
      document.body.append(testButton);

      // Act
      Dom.addClickEventToButton(".btn--test", () => {});
      testButton.click();

      // Assert
      expect(testButton).toHaveBeenClicked();
    });
  });
});
