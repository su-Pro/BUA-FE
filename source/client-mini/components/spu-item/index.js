// components/vatabs-item/index.js
import {Cart} from "../../models/cart";
import {CartItem} from "../../models/cart-item";
const cart = new Cart()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartCount: Number,
    skuItem: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {cartCount:0},

  lifetimes: {
    attached:async function() {
      // 页面被展示
      this.refreshCount()
    },
  },
  pageLifetimes: {
    show:async function(){
      // console.log("aaaaaaaaaaaa")
      this.refreshCount()
    }
  },
  methods: {
    async refreshCount(){
      const has = await cart.findEqualItem(this.properties.skuItem.id)
      if (has){
        this.setData({
          cartCount:cart.getSkuCountBySkuId(this.properties.skuItem.id)
        })
        return
      }else {
        this.setData({
          cartCount:0
        })
      }

    },
    onDetail() {
      console.log("onDetailonDetailonDetailonDetail")
      const skuId=this.properties.skuItem.id
      this.triggerEvent('showdetail', {skuId})
    }
  }
})
