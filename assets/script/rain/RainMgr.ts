import Factory, { EFactoryTag } from "../common/Factory";


const {ccclass, property} = cc._decorator;

@ccclass
export default class RainMgr extends cc.Component {

    @property(cc.Node)
    rainBox: cc.Node = null;


    startRain(){
        let count = 30;
        setInterval(() => {
            for(let i = 0; i < count; i++){
                let rain = Factory.instance.getElement(EFactoryTag.rain);
                rain.parent = this.rainBox || this.node;
            }
        }, 50);
    }

    endRain(){

    }

}
