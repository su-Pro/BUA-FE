/**
 * @作者 7七月
 * @创建时间 2019-10-24 15:59
 */
import {CellStatus} from "../../core/enum";

class Cell{
    title
    id
    status = CellStatus.WAITING
    spec
    skuImg

    constructor(spec) {
        this.title = spec.value
        this.id = spec.value_id
        this.spec = spec
    }

    getCellCode() {
        return this.spec.key_id + '-' + this.spec.value_id
    }


}

export {
    Cell
}