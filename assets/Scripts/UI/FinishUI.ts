import PlayerDataMgr from "../Libs/PlayerDataMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FinishUI extends cc.Component {

    @property(cc.Node)
    score: cc.Node = null

    @property(cc.Node)
    itemArr: cc.Node = null

    onLoad() { }

    start() {

    }

    nextGradeCB() {
        PlayerDataMgr.getPlayerData().grade++
        PlayerDataMgr.setPlayerData()

        cc.director.loadScene('StartScene')
    }

    // update (dt) {}
}
