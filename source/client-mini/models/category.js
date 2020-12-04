import {Http} from "../utils/http";

class Category {

    static async getHomeLocationC() {
        return await Http.request({
            url:`category/grid`
        })
    }

  static async getAllCategory() {
    return await Http.request({
      url:`category/all/with_spu`
    })
  }
}

export {
    Category
}
