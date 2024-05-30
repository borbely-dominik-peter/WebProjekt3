const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay)); //sleep function

// imports

import Car from "./car.js";
import Obstacle from "./obs.js";

/* Global value declarations */
let StartingText = document.querySelector("#startText");
let HTMLLines = document.querySelectorAll(".col");
let PCar = null; // player's car
const MaxLanes = 5; // amount of lanes in game
let ObsList = []; // list storing obstacles
let ObsListHTML = [] // obstacle HTML representations
let GameOver = false;
const moveCycleSpeed = 7;
let GlobalID = 1;
let score = 0;
let GameMusic = new Audio("music/GameMusic.wav");
GameMusic.loop = true;
let CrashSound = new Audio("sound/explosion.wav");
let highscore = document.querySelector('#HS_Value');
let highscore_title = document.querySelectorAll('#HS_Title');

highscore.innerHTML = localStorage.getItem('HighScore');

if(highscore.innerHTML == null){
    highscore.style.display = 'none';
    highscore_title.style.display = 'none';
}

StartingText.addEventListener("click", () => {
    StartingText.style.display = "none";
    StartGame();
});

async function ObstacleMaker(delay) {
    let LocDelay = delay
    while (!GameOver) {
        let Rrow = (Math.floor(Math.random() * MaxLanes)) + 1;
        GenerateObstacle(Rrow);
        await sleep(LocDelay);
        if (LocDelay > 300) {
            LocDelay -= 5;  // speed increase
        }
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

function CarMaker(carnum) {
    if (carnum == 1 || carnum == 2 || carnum == 3) {
        return new Car(`img/auto${carnum}.png-3`);
    }
    return new Car(`img/auto2.png-3`);
}

async function StartGame() {
    let Choice = prompt("Choose car skin: 1-Yellow, 2-Gray, 3-Green: ")
    PCar = CarMaker(Choice)
    DisplayCar(PCar.CurrLane);
    GameMusic.play();
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
                document.querySelector("#SCOut").innerHTML = score;
                if (score > highscore.innerHTML){
                    highscore.innerHTML = score;
                    localStorage.setItem('HighScore', score);
                }
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
    let NewObs = null;
    let randNum = Math.floor(Math.random() * 2);
    if(randNum == 1){
        NewObs = new Obstacle(`img/akadaly.png-${row}-578-605`);
    }
    else{
        NewObs = new Obstacle(`img/akadaly2.png-${row}-553-605`);
    }

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

const DSPIntV = setInterval(() => {
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
    clearInterval(DSPIntV); // desync of ending and box score possible, bugfix
    console.log(score);
    CrashSound.play();
    GameMusic.pause();
    document.querySelector("#SCOut").innerHTML = score; // desync of ending and box score possible, bugfix
    document.querySelector("#SCEnd").innerHTML = score;
    document.querySelector("#endText").style.display = "block";
    GameOver = true;
}

document.querySelector("#endText").addEventListener("click", () => {
    location.reload();
});
