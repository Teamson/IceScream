import Utility from "../Mod/Utility";
import GameCrl from "./GameCrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HandFruitCrl extends cc.Component {

    progressNode: cc.ProgressBar = null
    myColl: cc.BoxCollider = null

    totalHeight: number = 0

    onLoad() {
        this.progressNode = this.node.parent.getComponent(cc.ProgressBar)
        this.myColl = this.getComponent(cc.BoxCollider)
    }

    start() {
    }

    changeFruit(id: number) {
        Utility.loadSpriteFrame('GameTexture/yxy_sg_' + (id + 1).toString(), this.node.getComponent(cc.Sprite), () => {
            this.myColl.size = this.node.getContentSize()
            this.totalHeight = this.myColl.size.height
            this.myColl.offset.y = -(this.myColl.size.height / 2)

            this.progressNode.progress = 1
            this.progressNode.node.setContentSize(this.myColl.size)
        })
    }

    decProgress() {
        this.progressNode.progress -= 0.02
        if (this.progressNode.progress < 0) {
            this.progressNode.progress = 0
        }

        this.myColl.size.height = this.totalHeight * this.progressNode.progress
        this.myColl.offset.y = -(this.myColl.size.height / 2)

        GameCrl.Share.changeIceScreamProgress(1 - this.progressNode.progress)
    }

    onCollisionEnter(other, self) {
        if (other.node.name == 'collNode') {
            this.decProgress()
        }
    }
    onCollisionStay(other, self) {
        if (other.node.name == 'collNode') {
            this.decProgress()
        }
    }
    onCollisionExit(other, self) {
        if (other.node.name == 'collNode') {
            GameCrl.Share.activeJuicyFX(false)
        }
    }

    // update (dt) {}
}
