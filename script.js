const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay)); //sleep function

// imports

import Car from "./car.js";
import Obstacle from "./obs.js";

/* Global value declarations */
let StartingText = document.querySelector("#startText");
let HTMLLines = document.querySelectorAll(".col");
let PCar = new Car("img/auto2.png-3"); // player's car
const MaxLanes = 5; // amount of lanes in game
let ObsList = []; // list storing obstacles
let ObsListHTML = [] // obstacle HTML representations
let GameOver = false;

StartingText.addEventListener("click", () => {
    StartingText.style.display = "none";
    StartGame();
});

async function ObstacleGen() {
    while (!GameOver) { // loop for making obstacles
        GenerateObstacle();
        await sleep(1000);
    }
}

async function ObstacleMove() {
    while (!GameOver) {
        MoveObstacles(10);
        await sleep(200);
    }
}

function StartGame() {
    DisplayCar(PCar.CurrLane);
    document.addEventListener("keydown", () => {
        console.log(event);
        if (event.keyCode == 39) {
            if (!(PCar.CurrLane + 1 > MaxLanes)) {
                PCar.CurrLane += 1;
                DisplayCar(PCar.CurrLane);
            }
        }else if (event.keyCode == 37) {
            if (!(PCar.CurrLane - 1 < 1)) {
                PCar.CurrLane -= 1;
                DisplayCar(PCar.CurrLane);
            }
        }
    });
    ObstacleGen();
    ObstacleMove();

}

function DisplayCar(Lane) {
    HTMLLines.forEach(Column => {
        if (Column.id == `C-${Lane}`) {
            let NewImg = document.createElement("img");
            NewImg.src = PCar.imgSource;
            NewImg.classList.add("Car");
            NewImg.id = "CAR";
            Column.appendChild(NewImg);
        }
        else{
            let targetImg = Column.querySelector(".Car");
            if (targetImg === null) {
                // no break, so do nothing
            }
            else{
                Column.removeChild(targetImg);
            }
        }
    });
}

function GenerateObstacle() {
    let RandomRow = (Math.floor(Math.random() * MaxLanes)) + 1;
    let NewObs = new Obstacle(`/img/akadaly.png-${RandomRow}-632-568`);
    ObsList.push(NewObs);
    let NewObsHTML = document.createElement("img");

    HTMLLines.forEach(Column => {
        if (Column.id == `C-${RandomRow}`) {
            NewObsHTML.src = NewObs.imgSource;
            NewObsHTML.classList.add("obs");
            NewObsHTML.style.position = "absolute";
//            NewObsHTML.classList.add("obsT1");
            NewObsHTML.style.bottom = `${NewObs.YLowPos}px`;
            NewObsHTML.id = `${Column.id}-`
            Column.appendChild(NewObsHTML);
            ObsListHTML.push(NewObsHTML);
        }
    });
    console.log("OBS generated")
}



async function MoveObstacles(amount) {
    for (let index = 0; index < ObsList.length; index++) {
        console.log("MOVE ACTIVE");
        ObsList[index].YLowPos -= amount;
        ObsList[index].YHighPos -= amount;
        ObsListHTML[index].style.bottom -= amount;
    }
}
