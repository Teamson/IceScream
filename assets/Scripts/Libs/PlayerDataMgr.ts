import Utility from "../Mod/Utility";

const { ccclass, property } = cc._decorator;

export class PlayerData {
    grade: number = 1
    exitTime: number = 0
}
@ccclass
export default class PlayerDataMgr {
    private static _playerData: PlayerData = null

    //获取用户数据
    public static getPlayerData(): PlayerData {
        if (!localStorage.getItem('playerData')) {
            this._playerData = new PlayerData()
            localStorage.setItem('playerData', JSON.stringify(this._playerData))
        } else {
            if (this._playerData == null) {
                this._playerData = JSON.parse(localStorage.getItem('playerData')) as PlayerData
            }
        }
        return this._playerData
    }

    //设置用户数据
    public static setPlayerData() {
        localStorage.setItem('playerData', JSON.stringify(this._playerData))
    }

    public static getGradeFruitArr(): number[] {
        let arr: number[] = []

        if (this._playerData.grade < 6) {
            arr = [0, 1, 2]
        } else if (this._playerData.grade >= 6 && this._playerData.grade < 11) {
            arr = [0, 1, 2, 3]
        } else if (this._playerData.grade >= 11 && this._playerData.grade < 16) {
            arr = [0, 1, 2, 3, 4]
        } else {
            arr = [0, 1, 2, 3, 4, 5]
        }

        arr = Utility.shuffleArr(arr)
        if (arr.length > 3) {
            arr.splice(0, arr.length - 3)
        }

        return arr
    }

    public static getColorById(id: number): string {
        let c: string = ''
        switch (id) {
            case 0:
                c = '#e4251c'
                break
            case 1:
                c = '#eb751f'
                break
            case 2:
                c = '#fad721'
                break
            case 3:
                c = '#77cf06'
                break
            case 4:
                c = '#1892e8'
                break
            case 5:
                c = '#cb16e5'
                break
        }
        return c
    }
}
