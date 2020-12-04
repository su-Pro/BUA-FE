class Address {
    static STORAGE_KEY = 'address'

    static getLocal() {
        const address = wx.getStorageSync(Address.STORAGE_KEY)
        return address ? address : null
    }

    static setLocal(address) {
        wx.setStorageSync(Address.STORAGE_KEY, address)
    }
}

export {
    Address
}
