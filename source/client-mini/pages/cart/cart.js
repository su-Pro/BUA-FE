// pages/cart/cart.js
import {Cart} from "../../models/cart";
import {Calculator} from "../../models/calculator";

const cart = new Cart()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartItems: [],
    isEmpty: true,
    allChecked: false,
    totalPrice: 0,
    totalSkuCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const cartData = await cart.getAllCartItemFromLocal()
    console.log("cartData")
    console.log(cartData)
    if (cartData) {
      this.setData({
        cartItems: cartData.items,
        isEmpty: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:async function () {
    const cartData = await cart.getAllCartItemFromLocal();
    if (cart.isEmpty()) {
      console.log("cart.isEmpty()")
        this.empty()
        return
    }
    this.setData({
        cartItems: cartData.items
    })
    this.notEmpty()
    this.isAllChecked()
    this.refreshCartData()
  },
  //更新购物车中选中商品
  refreshCartData() {
    const checkedItems = cart.getCheckedItems()
    const calculator = new Calculator(checkedItems)
    calculator.calc()
    this.setCalcData(calculator)
  },

  //计算购物车中选中商品数量和总价
  setCalcData(calculator) {
    const totalPrice = calculator.getTotalPrice()
    const totalSkuCount = calculator.getTotalSkuCount()
    this.setData({
        totalPrice,
        totalSkuCount
    })
  },

  isAllChecked() {
    const allChecked = cart.isAllChecked()
    this.setData({
        allChecked
    })
  },

  onSingleCheck(event) {
    this.isAllChecked()
    this.refreshCartData()
  },
  onDeleteItem(event) {
      this.isAllChecked()
      this.refreshCartData()
        if(this.data.cartItems.length=0){
          this.empty()
        }
  },

  onCheckAll(event) {
      const checked = event.detail.checked
      cart.checkAll(checked)
      this.setData({
          cartItems: this.data.cartItems
      })
      this.refreshCartData()
  },

  empty() {
      this.setData({
          isEmpty: true,
      })
      wx.hideTabBarRedDot({
          index: 2
      })
  },

  notEmpty() {
      this.setData({
          isEmpty: false
      })
      wx.showTabBarRedDot({
          index: 2
      })
  },

  onSettle(event) {
      if (this.data.totalSkuCount <= 0) {
          return
      }
      wx.navigateTo({
          url: `/pages/order/order`
      })
  }

})
