export default class Car{
    constructor(DataRow){
        let Datas = DataRow.split("-");
        this.imgSource = Datas[0];
        this.CurrLane = Number(Datas[1]);
        this.YLowPos = 10;
        this.YHighPos = 180; // car size is +170, reduced to +160 to counter lag
    }
}
