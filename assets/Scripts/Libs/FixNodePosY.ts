
const { ccclass, property } = cc._decorator;

@ccclass
export default class FixNodePosY extends cc.Component {

    // onLoad () {}

    start() {
        let myPosY = this.node.y
        this.node.y = myPosY / 1334 * cc.view.getFrameSize().height
    }

    // update (dt) {}
}
