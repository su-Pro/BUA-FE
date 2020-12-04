class OrderPost {
    totalPrice
    finalTotalPrice
    couponId
    skuInfoList = []
    address = {}

    constructor(totalPrice, finalTotalPrice, couponId, skuInfoList, address) {
        this.totalPrice = totalPrice
        this.finalTotalPrice = finalTotalPrice
        this.couponId = couponId
        this.skuInfoList = skuInfoList
        this._fillAddress(address)
    }

    _fillAddress(address) {
        this.address.user_name = address.userName
        this.address.national_code = address.nationalCode
        this.address.postal_code = address.postalCode
        this.address.city = address.cityName
        this.address.province = address.provinceName
        this.address.county = address.countyName
        this.address.detail = address.detailInfo
        this.address.mobile = address.telNumber
    }
}

export {
    OrderPost
}
