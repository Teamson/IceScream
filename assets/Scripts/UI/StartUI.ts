
const { ccclass, property } = cc._decorator;

@ccclass
export default class StartUI extends cc.Component {

    onLoad() { }

    start() {

    }

    startCB() {
        cc.director.loadScene('GameScene')
    }

    // update (dt) {}
}
