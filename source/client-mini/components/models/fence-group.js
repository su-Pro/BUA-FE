/**
 * @作者 7七月
 * @创建时间 2019-10-21 07:17
 */
import {Matrix} from "./matrix";
import {Fence} from "./fence";


class FenceGroup {
    spu
    skuList = []
    fences = []

    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }

    getDefaultSku() {
        const defaultSkuId = this.spu.default_sku_id
        if (!defaultSkuId) {
            return
        }
        return this.skuList.find(s => s.id === defaultSkuId)
    }

    getSku(skuCode) {
        const fullSkuCode = this.spu.id + '$' + skuCode
        const sku = this.spu.sku_list.find(s => s.code === fullSkuCode)
        return sku ? sku : null
    }

    setCellStatusById(cellId, status) {
        this.eachCell((cell) => {
            if (cell.id === cellId) {
                cell.status = status
            }
        })
    }

    setCelStatusByXY(x, y, status) {
        this.fences[x].cells[y].status = status
    }

    initFences() {
        const matrix = this._createMatrix(this.skuList)
        const fences = []

        const AT = matrix.transpose()
        AT.forEach(r => {
            const fence = new Fence(r)
            fence.init()
            if (this._hasSketchFence() && this._isSketchFence(fence.id)) {
                fence.setFenceSketch(this.skuList)
            }
            fences.push(fence)
        })
        this.fences = fences
    }

    _hasSketchFence() {
        return this.spu.sketch_spec_id ? true : false
    }

    _isSketchFence(fenceId) {
        return this.spu.sketch_spec_id === fenceId ? true : false
    }


    eachCell(cb) {
        for (let i = 0; i < this.fences.length; i++) {
            for (let j = 0; j < this.fences[i].cells.length; j++) {
                const cell = this.fences[i].cells[j]
                cb(cell, i, j)
            }
        }
    }

    _createMatrix(skuList) {
        const m = []
        skuList.forEach(sku => {
            m.push(sku.specs)
        })
        return new Matrix(m)
    }

    initFences1() {
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        let currentJ = -1;
        matrix.each((element, i, j) => {
            if (currentJ !== j) {
                // 开启一个新列，需要创建一个新的Fence
                currentJ = j
                fences[currentJ] = this._createFence(element)
                // createFence
            }
            fences[currentJ].pushValueTitle(element.value)
        })
    }


    _createFence(element) {
        const fence = new Fence()
        return fence
    }

    // 1. 数学函数库 JS 体积 mathjs 1MB
    // 2. 不用 借助矩阵思维
}

export {
    FenceGroup
}