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
const moveCycleSpeed = 5;
let GlobalID = 1;
let score = 0;

StartingText.addEventListener("click", () => {
    StartingText.style.display = "none";
    StartGame();
});

async function ObstacleMaker(delay) {
    while (!GameOver) {
        let Rrow = (Math.floor(Math.random() * MaxLanes)) + 1;
        GenerateObstacle(Rrow);
        await sleep(delay);
    }
}



async function MoveObstacles(amount) {
    for (let index = 0; index < ObsList.length; index++) {
        ObsListHTML[index].style.bottom = `${Number(ObsList[index].YLowPos) - amount}px`;
        ObsList[index].MoveObs(amount);
    }
    /*HTMLLines.forEach(Column => {
        let ChildImgs = Column.querySelectorAll(".obs");
        ChildImgs.forEach(Cimg => {
            let CimgId = Cimg.id;
            for (let index = 0; index < ObsList.length; index++) {
                if (ObsList[index].id == CimgId) {
                    console.log("ID MATCH");
                    Cimg.style.bottom = `${ObsList[index] - amount}px`;
                    ObsList[index].MoveObs(amount);
                }
            }
        });
    });*/
}

async function StartGame() {
    DisplayCar(PCar.CurrLane);
    document.addEventListener("keydown", () => {
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
    ObstacleMaker(600);

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

function DeSpawnObjects() {
    HTMLLines.forEach(Column => {
        let ChildImgs = Column.querySelectorAll(".obs");
        ChildImgs.forEach(Cimg => {
            if (Cimg.style.bottom[0] == "-") {
                Column.removeChild(Cimg);
                score++;
                for (let index = 0; index < ObsList.length; index++) {
                    if (ObsList[index].id == Cimg.id) {
                        ObsList.splice(index,1);
                        ObsListHTML.splice(index,1);
                    }
                }
            }
        });
    });
}

function GenerateObstacle(row) {
    let NewObs = new Obstacle(`/img/akadaly.png-${row}-578-605`);

    let NewObsHTML = document.createElement("img");

    HTMLLines.forEach(Column => {
        if (Column.id == `C-${row}`) {
            NewObsHTML.src = NewObs.imgSource;
            NewObsHTML.classList.add("obs");
            NewObsHTML.style.position = "absolute";
//            NewObsHTML.classList.add("obsT1");
            NewObsHTML.style.bottom = `${NewObs.YLowPos}px`;
            Column.appendChild(NewObsHTML);
            ObsListHTML.push(NewObsHTML);
            NewObsHTML.id = GlobalID;
            NewObs.id = NewObsHTML.id;
            ObsList.push(NewObs);
            GlobalID++;
        }
    });
}

const MovIntV = setInterval(() => {
    MoveObstacles(3);
}, moveCycleSpeed);

setInterval(() => {
    DeSpawnObjects();
}, 50)

const CollisionIntV = setInterval(() => {
    ScanForCollision();

}, 75);

function ScanForCollision(){
    /*ObsList.forEach(Obs => {
        if ((Obs.CurrLane == PCar.CurrLane) && (Obs.YLowPos <= PCar.YHighPos && Obs.YHighPos >= PCar.YLowPos)) {
            console.log(Obs.YLowPos);
            EndGame();
            clearInterval(CollisionIntV); 
            return true;
        }
    });*/
    for (let index = 0; index < ObsList.length; index++) {
        if ((ObsList[index].CurrLane == PCar.CurrLane) && (ObsList[index].YLowPos <= PCar.YHighPos && ObsList[index].YHighPos >= PCar.YLowPos)) {
            clearInterval(MovIntV);
            console.log(ObsList[index].YLowPos);
            console.log(ObsListHTML[index].style.bottom);
            EndGame();
            clearInterval(CollisionIntV); 
            return true;
        }   
    }
}

function EndGame() {
    console.log(score);
    document.querySelector("#sc").innerHTML = score;
    document.querySelector("#endText").style.display = "block";
    GameOver = true;
}
