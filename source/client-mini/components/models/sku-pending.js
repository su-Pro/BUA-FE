/**
 * @作者 7七月
 * @微信公号 林间有风
 * @开源项目 $ http://7yue.pro
 * @免费专栏 $ http://course.7yue.pro
 * @我的课程 $ http://imooc.com/t/4294850
 * @创建时间 2019-11-01 17:48
 */
import {Cell} from "./cell";
import {Joiner} from "../../utils/joiner";

class SkuPending {
    pending = []
    size

    constructor(size) {
        this.size = size
    }

    init(sku) {
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new Cell(sku.specs[i])
            this.insertCell(cell, i)
        }
    }

    getCurrentSpecValues() {
        const values = this.pending.map(cell => {
            return cell ? cell.spec.value : null
        })
        return values
    }

    getMissingSpecKeysIndex() {
        const keysIndex = []
        for (let i = 0; i < this.size; i++) {
            if(!this.pending[i]){
                keysIndex.push(i)
            }
        }
        return keysIndex
    }

    getSkuCode() {
        const joiner = new Joiner('#')
        this.pending.forEach(cell => {
            const cellCode = cell.getCellCode()
            joiner.join(cellCode)
        })
        return joiner.getStr()
    }

    isIntact() {
        for (let i = 0; i < this.size; i++) {
            if (this._isEmptyPart(i)) {
                return false
            }
        }
        return true
    }

    _isEmptyPart(index) {
        return !this.pending[index]
    }

    insertCell(cell, x) {
        this.pending[x] = cell
    }

    // [undefined,undein,cell]

    removeCell(x) {
        this.pending[x] = null
    }

    findSelectedCellByX(x) {
        return this.pending[x]
    }


    isSelected(cell, x) {
        const pendingCell = this.pending[x]
        if (!pendingCell) {
            return false
        }
        return cell.id === pendingCell.id
    }


}

export {
    SkuPending
}