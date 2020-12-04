/**
 * @作者 7七月
 * @创建时间 2019-10-21 07:17
 */
import {Cell} from "./cell";


class Fence {

    cells = []
    specs
    title
    id

    constructor(specs) {
        this.specs = specs
        this.title = specs[0].key
        this.id = specs[0].key_id
    }

    init() {
        this._initCells()
    }


    _initCells() {
        this.specs.forEach(s => {
            const existed = this.cells.some(c=>{
                return c.id === s.value_id
            })
            if(existed){
                return
            }
            const cell = new Cell(s)
            this.cells.push(cell)
        })
    }

    setFenceSketch(skuList) {
        this.cells.forEach(c=>{
            this._setCellSkuImg(c, skuList)
        })
    }

    _setCellSkuImg(cell, skuList) {
        const specCode = cell.getCellCode()
        const matchedSku = skuList.find(s=>s.code.includes(specCode))
        if(matchedSku){
            cell.skuImg = matchedSku.img
        }
    }

    // pushValueTitle(title) {
    //     this.valueTitles.push(title)
    // }
}

export {
    Fence
}