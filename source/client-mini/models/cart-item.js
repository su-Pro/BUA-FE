class CartItem {
    skuId = null
    count = 0
    sku = null
    checked = true

    constructor(sku, count) {
        this.skuId = sku.id
        this.sku = sku
        this.count = count
    }

}

export {
    CartItem
}
