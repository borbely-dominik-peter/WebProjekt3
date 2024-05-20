export default class Car{
    constructor(DataRow){
        let Datas = DataRow.split("-");
        this.imgSource = Datas[0];
        this.CurrLane = Number(Datas[1]);
        this.YLowPos = 40;
        this.YHighPos = 296;
    }
}