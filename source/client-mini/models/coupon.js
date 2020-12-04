import {Http} from "../utils/http";
import {Token} from "./token";

class Coupon {
    static async collectCoupon(cid) {
        return await Http.request({
            url: `coupon/collection/${cid}`,
            throwError: true
        })
        // return await Http
    }

    static getMyCoupons(status) {
        return Http.request({
            url: `coupon/by/status/${status}`
        })
    }


    static async getCouponsByCategory(cid) {
        return await Http.request({
            url: `coupon/by/category/${cid}`,
        })
    }

    static async getMySelfWithCategory() {
        return Http.request({
            url: `coupon/myself/available/with_category`
        })
    }

    static async getTop2CouponsByCategory(cid) {
        let coupons = await Http.request({
            url: `coupon/by/category/${cid}`,
        })
        if (coupons.length === 0) {
            const otherCoupons = await Coupon.getWholeStoreCoupons()
            return Coupon.getTop2(otherCoupons)
        }
        if (coupons.length >= 2) {
            return coupons.slice(0, 2)
        }
        if (coupons.length === 1) {
            const otherCoupons = await Coupon.getWholeStoreCoupons()
            coupons = coupons.concat(otherCoupons)
            return Coupon.getTop2(coupons)
        }
    }

    static getTop2(coupons) {
        if (coupons.length === 0) {
            return []
        }
        if (coupons.length >= 2) {
            return coupons.slice(0, 2)
        }
        if (coupons.length === 1) {
            return coupons
        }
        return []
    }


    static async getWholeStoreCoupons() {
        return Http.request({
            url: `coupon/whole_store`
        })
    }
}

export {
    Coupon
}
