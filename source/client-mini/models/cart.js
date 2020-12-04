import {Spu} from "./spu";

class Cart {
  static SKU_MIN_COUNT = 1
  static SKU_MAX_COUNT = 77
  static CART_ITEM_MAX_COUNT = 77
  static STORAGE_KEY = 'cart'
  static Map_KEY = 'map'

  _cartData = null
  // _cartMap = new Map()
  // 单例模式
  constructor() {
    if (typeof Cart.instance === 'object') {
      return Cart.instance
    }
    Cart.instance = this
    return this
  }

  isEmpty() {
    const cartData = this._getCartData()
    console.log(cartData)
    return cartData.items.length === 0;
  }

  async getAllCartItemFromLocal() {
    return this._getCartData()
  }

  /**
   *从本地缓存中获取购物车数据
   *
   * @returns {null|{items: *[]}}
   * @private
   */
  _getCartData() {
    if (this._cartData !== null) {
      // console.log(this._cartMap)
      // this._cartMap = this.cartToMap(this._cartMap)
      return this._cartData
    }
    let cartData = wx.getStorageSync(Cart.STORAGE_KEY);
    // let cartMap = wx.getStorageSync(Cart.Map_KEY);
    if (!cartData) {
      cartData = this._initCartDataStorage()
    }
    this._cartData = cartData
    // this._cartMap=cartMap
    return cartData
  }

  /**
   * 初始化缓存中的购物车数据
   *
   * @returns {{items: []}}
   * @private
   */
  _initCartDataStorage() {
    const cartData = {
      items: []
    }
    // const cartMap = this._cartMap
    wx.setStorageSync(Cart.STORAGE_KEY, cartData)
    // wx.setStorageSync(Cart.Map_KEY, cartMap)
    return cartData
  }

  /**
   * 向购物车添加商品
   * @param newItem
   */
  addItem(newItem) {
    if (this.beyondMaxCartItemCount()) {
      throw new Error('超过购物车最大数量')
    }
    this._pushItem(newItem)
    this._refreshStorage()
  }

  removeItem(skuId) {
    const oldItemIndex = this._findEqualItemIndex(skuId)
    const cartData = this._getCartData()
    cartData.items.splice(oldItemIndex, 1)
    // this.removeItemFromMap(skuId)
    this._refreshStorage()
  }

  _findEqualItemIndex(skuId) {
    const cartData = this._getCartData()
    return cartData.items.findIndex(item => {
      return item.skuId === skuId
    })
  }



  // cartToMap() {
    // console.log(this._cartData)
    // this._cartData.items.forEach((item)=>{this.replaceItemCountAtMap(item)})
    // console.log(this._cartMap)
  // }
  // replaceItemCountAtMap(item){
  //   console.log(item)
  //   this._cartMap.set(item.skuId,item.count)
  // }
  // removeItemFromMap(itemId){
  //   this._cartMap.delete(itemId)
  // }
  /**
   * 校验当前购物车是否已满
   * @returns {boolean}
   */
  beyondMaxCartItemCount() {
    const cartData = this._getCartData()
    return cartData.items.length >= Cart.CART_ITEM_MAX_COUNT;
  }

  /**
   * 添加商品的核心实现
   * @param newItem
   * @private
   */
  _pushItem(newItem) {
    const cartData = this._getCartData()

    // 购物车中是否已存在相同sku
    const oldItem = this.findEqualItem(newItem.skuId)
    if (!oldItem) {
      cartData.items.unshift(newItem)
    } else {
      this._combineItems(oldItem, newItem)
    }
  }

  /**
   * 更新购物车中item的数量
   * @param skuId
   * @param newCount
   */
  replaceItemCount(skuId, newCount) {
    const oldItem = this.findEqualItem(skuId)
    if (!oldItem) {
      console.error('异常情况，更新CartItem中的数量不应当找不到相应数据')
      return
    }
    if (newCount < 1) {
      console.error('异常情况，CartItem的Count不可能小于1')
      return
    }
    oldItem.count = newCount
    // this.replaceItemCountAtMap(oldItem)
    if (oldItem.count >= Cart.SKU_MAX_COUNT) {
      oldItem.count = Cart.SKU_MAX_COUNT
    }
    this._refreshStorage()
  }

  /**
   * 更新本地缓存中的购物车列表
   * @private
   */
  _refreshStorage() {
    wx.setStorageSync(Cart.STORAGE_KEY, this._cartData)
  }

  /**
   * 根据skuId查找相同商品
   * @param skuId
   * @returns {null}
   */
  findEqualItem(skuId) {
    let oldItem = null
    const items = this._getCartData().items
    for (let i = 0; i < items.length; i++) {
      if (this._isEqualItem(items[i], skuId)) {
        oldItem = items[i]
        break
      }
    }
    return oldItem
  }

  _isEqualItem(oldItem, skuId) {
    return oldItem.skuId === skuId;
  }

  /**
   * 合并相同的sku
   * @param oldItem
   * @param newItem
   * @private
   */
  _combineItems(oldItem, newItem) {
    this._plusCount(oldItem, newItem.count)
  }

  /**
   * 增加商品的数量
   * @param item
   * @param count
   * @private
   */
  _plusCount(item, count) {
    item.count += count
    if (item.count >= Cart.SKU_MAX_COUNT) {
      item.count = Cart.SKU_MAX_COUNT
    }
  }

  /**
   * 获取购物车物品个数
   * @returns {number}
   */
  getCartItemCount() {
    return this._getCartData().items.length
  }


  static isSoldOut(item) {
    return item.sku.stock === 0
  }

  static isOnline(item) {
    return !!item.sku.online
  }

  checkItem(skuId) {
    const oldItem = this.findEqualItem(skuId)
    oldItem.checked = !oldItem.checked
    this._refreshStorage()
  }

  isAllChecked() {
    let allChecked = true
    const cartItems = this._getCartData().items
    for (let item of cartItems) {
      if (!item.checked) {
        allChecked = false
        break
      }
    }
    return allChecked
  }

  checkAll(checked) {
    const cartData = this._getCartData()
    cartData.items.forEach(item => {
      item.checked = checked
    })
    this._refreshStorage()
  }

  getCheckedItems() {
    const cartItems = this._getCartData().items
    const checkedCartItems = []
    cartItems.forEach(item => {
      if (item.checked) {
        checkedCartItems.push(item)
      }
    })
    return checkedCartItems
  }


  getSkuCountBySkuId(skuId) {
    const cartData = this._getCartData()
    const item = cartData.items.find(item => item.skuId === skuId)
    if (!item) {
      console.error('在订单里寻找CartItem时不应当出现找不到的情况')
    }
    return item.count
  }

  removeCheckedItems() {
    const cartData = this._getCartData()
    for (let i = 0; i < cartData.items.length; i++) {
      if (cartData.items[i].checked) {
        cartData.items.splice(i, 1)
        // this.removeItemFromMap(cartData.items[i].id)
      }
    }
    this._refreshStorage()
  }


}

export {
  Cart
}
