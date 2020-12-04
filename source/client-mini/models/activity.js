import {Http} from "../utils/http";

class Activity {
    static locationD = 'a-1'

    static async getHomeLocationD() {
        return await Http.request({
            url: `activity/name/${Activity.locationD}`
        })
    }

    static async getActivityWithCoupon(activityName) {
        return Http.request({
            url: `activity/name/${activityName}/with_coupon`
        })
    }
}

export {
    Activity
}
