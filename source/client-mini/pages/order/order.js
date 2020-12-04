import {Cart} from "../../models/cart";
import {OrderItem} from "../../models/order-item";
import {Order} from "../../models/order";
import {Coupon} from "../../models/coupon";
import {CouponBO} from "../../models/coupon-bo";
import {CouponOperate, ShoppingWay} from "../../core/enum";
import {showToast} from "../../utils/ui";
import {OrderPost} from "../../models/order-post";
import {Payment} from "../../models/payment";

const cart = new Cart()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    finalTotalPrice: 0,
    totalPrice: 0,
    discountMoney: 0,
    submitBtnDisable: false,

    address: null,

    currentCouponId: null,
    order: null,
    isOk: true,

    orderFail: false,
    orderFailMsg: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let orderItems;
    let localItemCount
      const checkedItems = cart.getCheckedItems()
      orderItems = await this.getCartOrderItems(checkedItems)
      localItemCount = orderItems.length

    const order = new Order(orderItems, localItemCount)
    console.log(order)
    this.data.order = order

    try {
      order.checkOrderIsOk()
    } catch (e) {
      console.error(e)
      this.setData({
        isOk: false
      })
      return
    }
    // const coupons = await Coupon.getMySelfWithCategory()
    // const couponBOList = this.packageCouponBOList(coupons, order)
    console.log(orderItems)
    this.setData({
      orderItems,
      // couponBOList,
      totalPrice: order.getTotalPrice(),
      finalTotalPrice: order.getTotalPrice()
    })
  },

  async getCartOrderItems(checkedItems) {
    const orderItems = this.packageOrderItems(checkedItems)
    return orderItems
  },

  packageOrderItems(checkedItems) {
    console.log(checkedItems)
    return checkedItems.map(checkedItem => {
      const count = cart.getSkuCountBySkuId(checkedItem.skuId)
      return new OrderItem(checkedItem.sku, count)
    })
  },

  async onSubmit(event) {
    if (!this.data.address) {
      showToast('请选择收获地址')
      return
    }

    this.disableSubmitBtn()
    const order = this.data.order

    const orderPost = new OrderPost(
      this.data.totalPrice,
      this.data.finalTotalPrice,
      this.data.currentCouponId,
      order.getOrderSkuInfoList(),
      this.data.address

    )

    const oid = await this.postOrder(orderPost)
    console.log(oid)
    if (!oid) {
      this.enableSubmitBtn()
      return
    }

      cart.removeCheckedItems()

    const payParams = await Payment.getPayParams(oid)

    if (!payParams) {
      return
    }

    try {
      const res = await wx.requestPayment(payParams)
      wx.redirectTo({
        url: `/pages/pay-success/pay-success?oid=${oid}`
      })
    } catch (e) {
      wx.redirectTo({
        url: `/pages/my-order/my-order?key=${1}`
      })
    }

    // wx.requestPayment()

  },
  /**
   * 提交订单
   * @param orderPost
   * @returns {Promise<*>}
   */
  async postOrder(orderPost) {
    try {
      const serverOrder = await Order.postOrderToServer(orderPost)
      if (serverOrder) {
        return serverOrder.id
      }
      // throwError
    } catch (e) {
      // code
      this.setData({
        orderFail: true,
        orderFailMsg: e.message
      })
    }
  },

  disableSubmitBtn() {
    this.setData({
      submitBtnDisable: true
    })
  },

  enableSubmitBtn() {
    this.setData({
      submitBtnDisable: false
    })
  },

  onChooseAddress(event) {
    const address = event.detail.address
    this.data.address = address
  },



  onChooseCoupon(event) {
    const couponObj = event.detail.coupon
    const couponOperate = event.detail.operate

    if (couponOperate === CouponOperate.PICK) {
      this.data.currentCouponId = couponObj.id
      const priceObj = CouponBO.getFinalPrice(this.data.order.getTotalPrice(), couponObj)
      this.setData({
        finalTotalPrice: priceObj.finalPrice,
        discountMoney: priceObj.discountMoney
      })
    } else {
      this.data.currentCouponId = null
      this.setData({
        finalTotalPrice: this.data.order.getTotalPrice(),
        discountMoney: 0
      })
    }

  },


  packageCouponBOList(coupons, order) {
    return coupons.map(coupon => {
      const couponBO = new CouponBO(coupon)
      couponBO.meetCondition(order)
      return couponBO
    })
  }


})
