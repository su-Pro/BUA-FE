// pages/coupon/coupon.js
import {Activity} from "../../models/activity";
import {CouponStatus, OrderStatus} from "../../core/enum";
import {Coupon} from "../../models/coupon";
import {Order} from "../../models/order";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey:CouponStatus.AVAILABLE,
    items:[],
    loadingType:'loading',
    bottomLoading:true,
    paging:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // const aName = options.name

    const activeKey = options.key
    this.data.activeKey = options.key

    this.initItems(activeKey)
  },

  getPaging(activeKey) {
    activeKey = parseInt(activeKey)
    switch (activeKey) {
      case CouponStatus.AVAILABLE:
        return Coupon.getMyCoupons(CouponStatus.AVAILABLE)
      case CouponStatus.USED:
        return Coupon.getMyCoupons(CouponStatus.USED)
      case CouponStatus.EXPIRED :
        return Coupon.getMyCoupons(CouponStatus.EXPIRED)
    }
  },

  onSegmentChange(event) {
    const activeKey = event.detail.activeKey
    this.initItems(activeKey)
  },

  async initItems(activeKey) {

    // wx.lin.hideEmpty()
    this.setData({
      activeKey,
      items:[]
    })
    if(activeKey==CouponStatus.AVAILABLE){}
    if(activeKey==CouponStatus.USED){}
    if(activeKey==CouponStatus.EXPIRED){}
    const data=await this.getPaging(activeKey)
    console.log(data)
    if(!data){
      return
    }
    this.bindItems(data)
  },


  bindItems(data) {
    console.log(data)
    this.setData({coupons:data})
  },


})
