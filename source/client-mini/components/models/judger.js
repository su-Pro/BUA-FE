/**
 * @作者 7七月
 * @微信公号 林间有风
 * @开源项目 $ http://7yue.pro
 * @免费专栏 $ http://course.7yue.pro
 * @我的课程 $ http://imooc.com/t/4294850
 * @创建时间 2019-10-28 03:53
 */
import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {SkuPending} from "./sku-pending";
import {Cell} from "./cell";
import {Joiner} from "../../utils/joiner";

class Judger {

    fenceGroup
    pathDict = []
    skuPending

    //沟通类
    //本职类

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initPathDict()
        this._initSkuPending()
    }

    isSkuIntact() {
        return this.skuPending.isIntact()
    }

    getCurrentValues() {
        return this.skuPending.getCurrentSpecValues()
    }

    getMissingKeys() {
        const missingKeysIndex = this.skuPending.getMissingSpecKeysIndex()
        return missingKeysIndex.map(i => {
            return this.fenceGroup.fences[i].title
        })
    }

    _initSkuPending() {
        const specsLength = this.fenceGroup.fences.length
        this.skuPending = new SkuPending(specsLength)
        const defaultSku = this.fenceGroup.getDefaultSku()
        if (!defaultSku) {
            return
        }
        this.skuPending.init(defaultSku)
        this._initSelectedCell()
        this.judge(null, null, null, true)
    }

    _initSelectedCell() {
        this.skuPending.pending.forEach(cell => {
            this.fenceGroup.setCellStatusById(cell.id, CellStatus.SELECTED)
        })
    }

    _initPathDict() {
        this.fenceGroup.spu.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
    }

    judge(cell, x, y, isInit = false) {
        if (!isInit) {
            this._changeCurrentCellStatus(cell, x, y)
        }

        this.fenceGroup.eachCell((cell, x, y) => {
            const path = this._findPotentialPath(cell, x, y)
            if (!path) {
                return
            }
            const isIn = this._isInDict(path)
            if (isIn) {
                this.fenceGroup.setCelStatusByXY(x, y, CellStatus.WAITING)
            } else {
                this.fenceGroup.setCelStatusByXY(x, y, CellStatus.FORBIDDEN)
            }
        })
    }

    getDeterminateSku() {
        const code = this.skuPending.getSkuCode()
        const sku = this.fenceGroup.getSku(code)
        return sku
    }


    _isInDict(path) {
        return this.pathDict.includes(path)
    }

    _findPotentialPath(cell, x, y) {
        const joiner = new Joiner('#')

        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            const selected = this.skuPending.findSelectedCellByX(i)
            if (x === i) {
                // 当前行
                // cell id 1-42
                if (this.skuPending.isSelected(cell, x)) {
                    return
                }
                const cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode)
            } else {
                // 其他行
                if (selected) {
                    //selected cell path
                    // 3-56
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                }
            }
        }
        return joiner.getStr()
    }


    _getCellCode(spec) {
        return spec.key_id + '-' + spec.value_id
    }

    _changeCurrentCellStatus(cell, x, y) {
        if (cell.status === CellStatus.WAITING) {
            this.fenceGroup.setCelStatusByXY(x, y, CellStatus.SELECTED)
            this.skuPending.insertCell(cell, x)
        }
        if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.setCelStatusByXY(x, y, CellStatus.WAITING)
            this.skuPending.removeCell(x)
        }
    }

}

export {
    Judger
}