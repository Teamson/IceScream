import PlayerDataMgr from "../Libs/PlayerDataMgr";
import Utility from "../Mod/Utility";
import HandFruitCrl from "./HandFruitCrl";

const { ccclass, property } = cc._decorator;

const FINGER_POSY = 700

@ccclass
export default class GameCrl extends cc.Component {

    public static Share: GameCrl

    @property(cc.Node)
    btnNodeArr: cc.Node[] = []

    @property(cc.Node)
    iceScreamNodeArr: cc.Node[] = []

    @property(cc.Node)
    targetPicNodeArr: cc.Node[] = []

    @property(cc.Node)
    gradeTargetPicNodeArr: cc.Node[] = []

    @property(cc.Node)
    handNode: cc.Node = null

    @property(cc.Node)
    bottomNode: cc.Node = null

    @property(cc.Label)
    gradeNum: cc.Label = null

    @property(cc.Node)
    touchBtn: cc.Node = null
    @property(cc.Node)
    handBar: cc.Node = null
    @property(cc.Node)
    juicyFX: cc.Node = null
    @property(cc.Node)
    rotateNode: cc.Node = null

    gradeDataArr: number[] = []
    currentTargetId: number = 0
    selectId: number = 0

    isSelected: boolean = false

    onLoad() {
        GameCrl.Share = this
        PlayerDataMgr.getPlayerData()
    }

    start() {
        this.initGradeData()
        this.touchBtn.on('touchstart', this.dropCB, this)
        this.touchBtn.on('touchend', this.upCB, this)
    }

    startRotate() {
        let a1 = cc.flipX(true)
        let a2 = cc.flipX(false)
        let sq = cc.sequence(a1, cc.delayTime(0.03), a2, cc.delayTime(0.1))
        this.rotateNode.runAction(cc.repeatForever(sq))
    }

    initGradeData() {
        this.gradeNum.string = PlayerDataMgr.getPlayerData().grade.toString()
        this.gradeDataArr = PlayerDataMgr.getGradeFruitArr()

        //初始化目标雪糕颜色
        for (let i = 0; i < this.gradeTargetPicNodeArr.length; i++) {
            let b: cc.Node = this.gradeTargetPicNodeArr[i]
            b.color = new cc.Color().fromHEX(PlayerDataMgr.getColorById(this.gradeDataArr[i]))
        }

        //初始化雪糕目标颜色
        for (let i = 0; i < this.targetPicNodeArr.length; i++) {
            let b: cc.Node = this.targetPicNodeArr[i]
            Utility.loadSpriteFrame('GameTexture/yxy_tb_' + (this.gradeDataArr[i] + 1).toString(), b.getComponent(cc.Sprite))
        }

        //初始化雪糕遮罩颜色
        // for (let i = 0; i < this.iceScreamNodeArr.length; i++) {
        //     let b: cc.Node = this.iceScreamNodeArr[i].children[0].children[0]
        //     b.color = new cc.Color().fromHEX(PlayerDataMgr.getColorById(this.gradeDataArr[i]))
        // }

        this.randBtnPic()
    }

    randBtnPic() {
        let arr: number[] = Utility.shuffleArr(this.gradeDataArr)
        for (let i = 0; i < this.btnNodeArr.length; i++) {
            let b: cc.Node = this.btnNodeArr[i]
            Utility.loadSpriteFrame('GameTexture/yxy_sg_' + (arr[i] + 1).toString(), b.getComponent(cc.Sprite))
            b.name = arr[i].toString()

            b.off('touchend', this.selectBtnCB, this)
            b.on('touchend', this.selectBtnCB, this)
        }
    }

    changeCurPic(id: number) {
        if (this.isSelected) {
            return
        }

        this.startRotate()
        this.selectId = id
        this.bottomNode.active = false
        this.touchBtn.active = true
        this.handNode.active = true
        let handBarCrl: HandFruitCrl = this.handBar.getComponent(HandFruitCrl)
        handBarCrl.changeFruit(id)
    }

    selectBtnCB(event: cc.Event) {
        if (this.isSelected) {
            return
        }
        let btn: cc.Node = event.target
        let id = parseInt(btn.name)

        this.changeCurPic(id)
    }

    dropCB() {
        this.handNode.stopAllActions()

        let time = this.handNode.y / FINGER_POSY * 2
        let a1 = cc.moveTo(time, cc.v2(0, 0))
        let a2 = cc.callFunc(() => {
            this.nextTargetIndex()
        })
        this.handNode.runAction(cc.sequence(a1, a2))
    }

    upCB() {
        this.handNode.stopAllActions()

        let time = (FINGER_POSY - this.handNode.y) / FINGER_POSY * 2
        let a1 = cc.moveTo(time, cc.v2(0, FINGER_POSY))
        this.handNode.runAction(a1)
    }

    changeIceScreamProgress(p: number) {
        let b: cc.Node = this.iceScreamNodeArr[this.currentTargetId].children[0]
        if (b.getComponent(cc.ProgressBar).progress >= 1) {
            return
        }
        b.getComponent(cc.ProgressBar).progress = p
        this.activeJuicyFX(true)

        let ice: cc.Node = this.iceScreamNodeArr[this.currentTargetId].children[0].children[0]
        ice.color = new cc.Color().fromHEX(PlayerDataMgr.getColorById(this.selectId))
    }

    activeJuicyFX(active: boolean) {
        if (!active) {
            this.juicyFX.active = active
        } else {
            this.juicyFX.active = true
            this.juicyFX.getComponent(cc.ParticleSystem).startColor = new cc.Color().fromHEX(PlayerDataMgr.getColorById(this.selectId))
        }
    }

    nextTargetIndex() {
        this.touchBtn.active = false
        this.handNode.stopAllActions()
        this.activeJuicyFX(false)

        let time = (FINGER_POSY - this.handNode.y) / FINGER_POSY * 2
        let a1 = cc.moveTo(time, cc.v2(0, FINGER_POSY))
        let a2 = cc.callFunc(() => {
            this.handNode.active = false
            this.currentTargetId++
            if (this.currentTargetId >= 3) {
                console.log('finish')
                cc.director.loadScene('FinishScene')
                return
            }
            this.bottomNode.active = true
            this.randBtnPic()
        })
        this.handNode.runAction(cc.sequence(a1, a2))
    }

    update(dt) {

    }
}
