// components/coupon-picker/index.js
import {getSlashYMD} from "../../utils/date";
import {CouponOperate} from "../../core/enum";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        coupons: Array
    },


    observers: {
        'coupons': function (coupons) {
            if (coupons.length === 0) {
                return
            }
            const couponsView = this.convertToView(coupons)
            const satisfactionCount = this.getSatisfactionCount(coupons)
            console.log(couponsView)
            this.setData({
                _coupons: couponsView,
                satisfactionCount
            })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        _coupons: [],
        currentKey: null,
        satisfactionCount: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        convertToView(coupons) {
            const couponsView = coupons.map(coupon => {
                return {
                    id: coupon.id,
                    title: coupon.title,
                    startTime: getSlashYMD(coupon.startTime),
                    endTime: getSlashYMD(coupon.endTime),
                    satisfaction: coupon.satisfaction
                }
            })
            couponsView.sort((a, b) => {
                if (a.satisfaction) {
                    return -1
                }
            })
            return couponsView
        },

        getSatisfactionCount(coupons) {
            return coupons.reduce((pre, coupon) => {
                if (coupon.satisfaction === true) {
                    return pre + 1
                }
                return pre
            }, 0)
        },

        onChange(event) {
            const currentKey = event.detail.currentKey
            const key = event.detail.key
            this.setData({
                currentKey
            })
            const currentCoupon = this.findCurrentCoupon(currentKey, key)
            this.triggerEvent('choose', {
                coupon: currentCoupon,
                operate: this.decidePickOrUnPick(currentKey)
            })
        },

        decidePickOrUnPick(currentKey) {
            if (currentKey === null) {
                return CouponOperate.UNPICK
            } else {
                return CouponOperate.PICK
            }
        },

        findCurrentCoupon(currentKey, key) {
            if (currentKey === null) {
                return this.properties.coupons.find(coupon => coupon.id == key)
            }
            return this.properties.coupons.find(coupon => coupon.id == currentKey)
        }

    }
})
