const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

export default class Obstacle{
    constructor(row){
        let data = row.split("-");
        this.imgSource = data[0];
        this.CurrLane = Number(data[1]);
        this.YLowPos = Number(data[2]);
        this.YHighPos = Number(data[3]);
    }

    MoveObs(AmountMov,time) {
        this.YLowPos -= AmountMov;
        this.YHighPos -= AmountMov;
        sleep(time);
        this.YLowPos -= 2000; // move object off the screen
        this.YHighPos -= 2000;
    }
}