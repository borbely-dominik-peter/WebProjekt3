let StartingText = document.querySelector("#startText");

console.log(StartingText);

StartingText.addEventListener("click", () => {
    StartingText.style.display = "none";
    StartMovement();
});

function StartMovement() {
    console.log("Move function active");
}
