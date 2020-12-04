// components/my-order-panel/index.js
// import {Order} from "../../models/order";

Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        unpaidCount: 0,
        paidCount: 0,
        deliveredCount: 0
    },

    lifetimes: {
        async attached() {
        }
    },

    pageLifetimes: {
        async show() {
            // const unpaidCount = await Order.getUnpaidCount()
            // const paidCount = await Order.getPaidCount()
            // const deliveredCount = await Order.getDeliveredCount()
            // this.setData({
            //     unpaidCount,
            //     paidCount,
            //     deliveredCount
            // })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onGotoMyOrder(event) {
            const key = event.currentTarget.dataset.key
            wx.navigateTo({
                url: `/pages/my-order/my-order?key=${key}`
            })
        }
    }
})
