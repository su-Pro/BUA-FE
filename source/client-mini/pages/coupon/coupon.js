// pages/coupon/coupon.js
import {Activity} from "../../models/activity";
import {CouponCenterType} from "../../core/enum";
import {Coupon} from "../../models/coupon";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupons: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // const aName = options.name
        const aName = "a-1"
    const type = options.type
    const cid = options.cid

    let coupons

    if (type === CouponCenterType.ACTIVITY) {
      const activity = await Activity.getActivityWithCoupon(aName)
      coupons = activity.couponList
    }
    if (type === CouponCenterType.SPU_CATEGORY) {
      coupons = await Coupon.getCouponsByCategory(cid)
      const wholeStoreCoupons = await Coupon.getWholeStoreCoupons()
      coupons = coupons.concat(wholeStoreCoupons)
    }

    this.setData({
      coupons
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
