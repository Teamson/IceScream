
const { ccclass, property } = cc._decorator;

@ccclass
export default class Utility {

    public static loadSpriteFrame(spName: string, sprite: cc.Sprite, cb?: Function) {
        //加载SpriteAtlas(图集)，并获取其中一张图片
        cc.loader.loadRes(spName, cc.SpriteFrame, function (err, spriteFrame) {
            sprite.spriteFrame = spriteFrame
            cb && cb()
        })
    }

    public static loadSpAtlas(atlasName: string, spfName: string, sprite: cc.Sprite) {
        //加载SpriteAtlas(图集)，并获取其中一张图片
        cc.loader.loadRes(atlasName, cc.SpriteAtlas, function (err, atlas) {
            sprite.spriteFrame = atlas.getSpriteFrame(spfName);
        })
    }

    //打乱数组
    public static shuffleArr(arr: any[]) {
        let i = arr.length;
        while (i) {
            let j = Math.floor(Math.random() * i--);
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }

    //数字前补0
    public static joinZero(length: number, num: number) {
        return (Array(length).join('0') + num).slice(-length);
    }

    public static getWorldPos(node: cc.Node, point: cc.Vec2 = cc.v2(0, 0)): cc.Vec2 {
        return node.convertToWorldSpaceAR(point)
    }

    public static getWorldDis(node1: cc.Node, node2: cc.Node) {
        let p1: cc.Vec2 = this.getWorldPos(node1)
        let p2: cc.Vec2 = this.getWorldPos(node2)
        return (p1.sub(p2)).mag()
    }
}
