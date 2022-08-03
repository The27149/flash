export enum EFactoryTag {
    rain = 0,
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Factory extends cc.Component {
    private static _instance: Factory = null;
    public static get instance(): Factory{
        if(!this._instance) this._instance = new Factory();
        return this._instance;
    }

    @property(cc.Prefab)
    rainPre: cc.Prefab = null;

    private pools: cc.NodePool[] = [];
    private prefabs: cc.Prefab[] = [];

    onLoad(){
        this.addPool(EFactoryTag.rain);
    }


    /** 根据tag添加一个对象池 */
    private addPool(tag: number){
        let str = EFactoryTag[tag];
        let pool = new cc.NodePool(str);
        let pre = this[`${str}Pre`];
        this.pools[tag] = pool;
        this.prefabs[tag] = pre;
    }

    /** 根据tag获取元素 */
    getElement(tag: EFactoryTag): cc.Node{
        let ele: cc.Node = null;
        let pool = this.pools[tag];
        if(pool.size() > 0) ele = pool.get();
        else{
            let pre = this.prefabs[tag];
            ele = cc.instantiate(pre);
        }
        return ele;
    }

    /** 元素放回节点池 */
    putElement(node: cc.Node, tag: EFactoryTag, checkFn?: Function){
        let pool = this.pools[tag];
        if(checkFn) checkFn() && pool.put(node)
        else pool.put(node);
    }

}
