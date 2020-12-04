import {accAdd, accMultiply} from "../utils/number";


class Calculator {
    totalPrice = 0
    totalSkuCount = 0
    cartItems = []

    constructor(cartItems) {
        this.cartItems = cartItems
    }

    calc() {
        this.cartItems.forEach(item => {
            this.push(item)
        })
    }

    getTotalPrice() {
        return this.totalPrice
    }

    getTotalSkuCount() {
        return this.totalSkuCount
    }

    push(cartItem) {
        let partTotalPrice = 0
        if (cartItem.sku.discount_price) {
            partTotalPrice = accMultiply(cartItem.count, cartItem.sku.discount_price)
        } else {
            partTotalPrice = accMultiply(cartItem.count, cartItem.sku.price)
        }
        this.totalPrice = accAdd(this.totalPrice, partTotalPrice)
        this.totalSkuCount += cartItem.count
    }
}

export {
    Calculator
}
