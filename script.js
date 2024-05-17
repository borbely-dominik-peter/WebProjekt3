import Car from "./car.js";

let StartingText = document.querySelector("#startText");

let HTMLLines = document.querySelectorAll(".col");

let PCar = new Car("img/auto2.png-3"); // player's car

let MaxLanes = 5; // amount of lanes in game

StartingText.addEventListener("click", () => {
    StartingText.style.display = "none";
    StartGame();
    document.addEventListener("keydown", () => {
        console.log(event);
        if (event.keyCode == 39) {
            console.log("right move");
            if (!(PCar.CurrLane + 1 > 5)) {
                PCar.CurrLane += 1;
                console.log("move right");
                DisplayCar(PCar.CurrLane);
            }
        }else if (event.keyCode == 37) {
            if (!(PCar.CurrLane - 1 < 1)) {
                PCar.CurrLane -= 1;
                DisplayCar(PCar.CurrLane);
            }
        }
    });
});

function StartGame() {
    DisplayCar(PCar.CurrLane);
}

function DisplayCar(Lane) {
    HTMLLines.forEach(Column => {
        if (Column.id == `C-${Lane}`) {
            let NewImg = document.createElement("img");
            NewImg.src = PCar.imgSource;
            NewImg.classList.add("Car");
            console.log(NewImg);
            Column.appendChild(NewImg);
        }
        else{
            Column.innerHTML = "";
        }
    });
}
