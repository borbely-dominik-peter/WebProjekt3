const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

export default class Obstacle{
    constructor(row){
        let data = row.split("-");
        this.imgSource = data[0];
        this.CurrLane = Number(data[1]);
        this.YLowPos = Number(data[2]);
        this.YHighPos = Number(data[3]);
        this.id = -1;
    }

    MoveObs(AmountMov) {
        this.YLowPos -= AmountMov;
        this.YHighPos -= AmountMov;
    }

    RemoveObs(){
        this.YLowPos -= 2000;
        this.YHighPos -= 2000;
    }

}
