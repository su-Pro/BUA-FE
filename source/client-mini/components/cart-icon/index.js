import {Cart} from "../../models/cart";
import {CartItem} from "../../models/cart-item";
import {Locker} from "../../models/locker"
import number from "../../miniprogram_npm/lin-ui/common/async-validator/validator/number";


let locker = new Locker()
const cart = new Cart()
Component({
  properties: {
    cartCount:Number,
    skuItem: Object,
  },
  data: {
    // cartCount:0
  },
  // lifetimes: {
  //   attached:async function() {
  //     // 页面被展示
  //     this.refreshCount()
  //   },
  // },
  // pageLifetimes: {
  //   show:async function(){
  //     console.log("aaaaaaaaaaaa")
  //     this.refreshCount()
  //   }
  //   },
  methods: {
    // async refreshCount(){
    //   // le.log(this.properties.skuItem)
    //   const has = await cart.findEqualItem(this.properties.skuItem.id)
    //   if (has){
    //     this.setData({
    //       cartCount:cart.getSkuCountBySkuId(this.properties.skuItem.id)
    //     })
    //     return
    //   }

    // },
    onAddToCart(event){
      if(!locker.getLocker()){
        return
      }
      const chosenSku = this.properties.skuItem
      const cart = new Cart()
      const cartItem = new CartItem(chosenSku, 1)
      cart.addItem(cartItem)
      const count = this.data.cartCount+1
      this.setData({
        cartCount:count
      })
      locker.releaseLocker()
    },
}
});
