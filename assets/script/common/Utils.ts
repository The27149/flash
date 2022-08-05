
export default class Utils{

    private static _instance: Utils = null;
    public static get instance(): Utils{
        if(!this._instance) this._instance = new Utils();
        return this._instance;
    }

    getRandomInt(min: number, max: number){
        if(min > max) [min, max] = [max, min];
        return Math.floor(Math.random() * (max - min) + min);
    }
}
