//app.js
import {Cart} from "./models/cart";
import {Token} from "./models/token";

App({
  onLaunch() {
    const cart = new Cart()
    // 如果购物车不为空显示导航栏购物车上面的红点
    if (!cart.isEmpty()) {
      wx.showTabBarRedDot({
        index: 2
      })
    }

    const token = new Token()
    token.verify()
    
  },
  global_data: {}
})
