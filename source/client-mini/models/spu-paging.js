import {Paging} from "../utils/paging";

class SpuPaging{
    static getLatestPaging() {
        return new Paging({
            url:`sku/lists`
        },5)
    }
}

export {
    SpuPaging
}
