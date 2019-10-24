const Dom = require("./Dom");

describe("Dom", () => {
  describe("addClickEventButton", () => {
    test("should add a click event to a given button", () => {
      // Arrange
      const testButton = document.createElement("button");
      testButton.classList.add("btn--test");

      const testParagraph = document.createElement("p")
      testParagraph.classList.add("p--test")
      testParagraph.textContent = "Original text"

      document.body.append(testButton);
      document.body.append(testParagraph)

      // Act
      Dom.addClickEventToButton(".btn--test", () => {
        testParagraph.textContent = "New text"
      });
      testButton.click();

      // Assert
      expect(testParagraph.textContent).toBe("New text");
    });
  });
});
