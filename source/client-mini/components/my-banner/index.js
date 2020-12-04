// components/my-banner/index.js
import {User} from "../../models/user";
import {promisic} from "../../utils/util";
import {Token} from "../../models/token";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        couponCount:Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        showLoginBtn: false,
        couponCount:Number
    },

    lifetimes: {
        async attached() {
            // wx.getUserInfo()
            console.log(this.properties.couponCount)
            if (!await this.hasAuthUserInfo()) {
                this.setData({
                    showLoginBtn: true
                })
            }
        }
    },

    observers:{
        'couponCount':function (couponCount) {
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        async onAuthUserInfo(event) {
            if (event.detail.userInfo) {
                wx.getUserInfo({
                  success: function(res) {
                    // var userInfo = res.userInfo
                    // var nickName = userInfo.nickName
                    // var avatarUrl = userInfo.avatarUrl
                    // var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    // var province = userInfo.province
                    // var city = userInfo.city
                    // var country = userInfo.country

                  }
                })
              this.setData({
                showLoginBtn:false
              })
            }
        },

        async hasAuthUserInfo() {
            const setting = await promisic(wx.getSetting)();
            const userInfo = setting.authSetting['scope.userInfo']
            return !!userInfo;
        },

        onGotoMyCoupon(event) {
            wx.navigateTo({
                url:`/pages/my-coupon/my-coupon`
            })
        },

        aboutUs(event) {
            wx.navigateTo({
                url:`/pages/about/about`
            })
        }
    }
})
