// console.log("Hello World!");

const buttons = document.querySelectorAll(".button");

const backgroundButton = document.querySelector(".addBackground");

buttons.forEach(function(button) {
  button.addEventListener("click", () => {
    const paragraph = document.createElement("p");

    paragraph.classList.add("newParagraph");

    paragraph.textContent = "My new paragraph!";

    document.body.append(paragraph);
  });
});

backgroundButton.addEventListener("click", () => {
  const paragraph = document.querySelector(".newParagraph");

  paragraph.classList.add("redBackground");
  paragraph.classList.remove("newParagraph");
});
