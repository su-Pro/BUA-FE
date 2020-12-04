import {OrderStatus} from "../core/enum";
import {accSubtract} from "../utils/number";
import {getSlashYMDHMS, toDate} from "../utils/date";
class OrderDetail {
    leftPeriod = 0
    statusText = ''
    discountPrice = 0
    createTime = null
    constructor(orderDetail) {
        Object.assign(this, orderDetail)
        this.correctOrderStatus()
        this.calDiscountPrice()
        this.createTime = getSlashYMDHMS(orderDetail.create_time)
    }

    orderStatusText(status) {
        switch (status) {
            case OrderStatus.FINISHED:
                return '已完成';
            case OrderStatus.UNPAID:
                return '待支付'
            case OrderStatus.PAID:
                return '待发货'
            case OrderStatus.DELIVERED:
                return '待收货'
            case OrderStatus.CANCELED:
                return '已取消'
        }
    }

    calDiscountPrice() {
        this.discountPrice = accSubtract(this.total_price, this.final_total_price)
    }

    correctOrderStatus() {
        if (this.status == OrderStatus.UNPAID) {
            const currentTimestamp = new Date().getTime();
            const createTimestamp = this.create_time;
            const periodMill = this.period * 1000;
            if ((createTimestamp + periodMill) > currentTimestamp) {
                const mill = (createTimestamp + periodMill) - currentTimestamp
                this.leftPeriod = Math.round(mill / 1000)
            } else {
                this.status = OrderStatus.CANCELED
            }
        }
        this.statusText = this.orderStatusText(this.status)
    }

}

export {
    OrderDetail
}

