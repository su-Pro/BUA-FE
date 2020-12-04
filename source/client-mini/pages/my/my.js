// pages/my/my.js
import {promisic} from "../../utils/util";
import {AuthAddress} from "../../core/enum";
import {Locker} from "../../models/locker"

const locker = new Locker()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponCount: 0,
      showDialog: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
  },

  onGotoMyCoupon(event) {
    wx.navigateTo({
      url: "/pages/my-coupon/my-coupon?key=1"
    })
  },

  onGotoMyOrder(event) {
    wx.navigateTo({
      url: "/pages/my-order/my-order?key=0"
    })
  },

  async onMgrAddress(event) {
    // 若锁没开着直接返回
    if(!locker.getLocker()){
      return
    }
    const authStatus = await this.hasAuthorizedAddress()

    // 微信9.25之后不需要再做处理，x.getSetting将直接开启全部同意的状态
    if (authStatus === AuthAddress.DENY) {
      this.setData({
        showDialog: true
      })
      locker.releaseLocker()
      return
    }

    this.openAddress()
    locker.releaseLocker()
  },

  async hasAuthorizedAddress() {
    const setting = await promisic(wx.getSetting)();
    const addressSetting = setting.authSetting['scope.address']

    // 微信9.25之后不需要再做处理，x.getSetting将直接开启全部同意的状态
    if (addressSetting === undefined) {
      return AuthAddress.NOT_AUTH
    }
    if (addressSetting === false) {
      return AuthAddress.DENY
    }
    if (addressSetting === true) {
      return AuthAddress.AUTHORIZED
    }
  },

  async openAddress() {
      let res;
      res = await promisic(wx.chooseAddress)()
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
