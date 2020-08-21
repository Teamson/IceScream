
const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingUI extends cc.Component {

    @property(cc.ProgressBar)
    pBar: cc.ProgressBar = null

    onLoad() {
        cc.director.getCollisionManager().enabled = true
        cc.director.getCollisionManager().enabledDebugDraw = true
    }

    start() {
        cc.director.preloadScene('GameScene', (completeCount: number, totalCount: number) => {
            this.pBar.progress = completeCount / totalCount
        }, () => {
            cc.director.loadScene('StartScene')
        })
    }

    // update (dt) {}
}
