// pages/home/home.js

import {Theme} from "../../models/theme";
import {imgsrc} from "../../config/config";
import {Category} from "../../models/category.js";
import {Activity} from "../../models/activity";
import {SpuPaging} from "../../models/spu-paging";
import {CouponCenterType} from "../../core/enum";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    themeE: null,
    bannerB: null,
    grid: [],
    imgsrc: imgsrc,
    activityD: null,
    spuPaging: null,
    loadingType: 'loading'
  },

  async onLoad(options) {
    this.initAllData()
    this.initBottomSpuList()
  },

  async initBottomSpuList() {
    const paging = SpuPaging.getLatestPaging()
    // console.log("----------------paging----------------");
    // console.log(paging)

    this.data.spuPaging = paging
    const data = await paging.getMoreData()
    // console.log("----------------data----------------");
    // console.log(data)

    if (!data) {
      return
    }
    console.log(data.itemList);
    
    // wx.lin.renderWaterFlow(data.items)
    wx.lin.renderWaterFlow(data.itemList)
  },

  async initAllData() {
    const theme = new Theme()
    await theme.getThemes()

    const themeA = theme.getHomeLocationA()
    // console.log("----------------themeA----------------");
    // console.log(themeA);

    const grid = await Category.getHomeLocationC()
    // console.log("----------------grid----------------");
    // console.log(grid);

    const activityD = await Activity.getHomeLocationD()
    // console.log("----------------activityD----------------");
    // console.log(activityD);


    this.setData({
      themeA,
      grid,
      activityD,
    })
  },

  // 跳转优惠券列表
  onGoToCoupons() {
    wx.navigateTo({
      url: `/pages/coupon/coupon?key=${CouponCenterType.ACTIVITY}`
    })
  },

  onGoToCategory(event) {
    
    getApp().global_data.activeTab= event.currentTarget.dataset.index
    
    wx.switchTab({
      url: `/pages/category/category`
    })
  },
  // 触底获取更多spu数据
  onReachBottom: async function () {
    const data = await this.data.spuPaging.getMoreData()
    if (!data) {
      return
    }
    wx.lin.renderWaterFlow(data.items)
    console.log("dataListdataListdataListdataList")
    console.log(data)
    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })
    }
  },

  onPullDownRefresh: function () {

  },


  onShareAppMessage: function () {

  }
})


