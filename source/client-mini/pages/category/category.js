import {mainColor} from "../../config/config"
import {Category} from "../../models/category.js";
import {Cart} from "../../models/cart";
import {Spu} from "../../models/spu";
import {CartItem} from "../../models/cart-item";
import {Locker} from "../../models/locker";

const cart = new Cart()
const locker = new Locker()
Page({
  data: {
    vtabs: [],
    activeTab: 0,
    mainColor: mainColor,
    cartCount:0,
    showPopup:false,
    skuItem:null
  },

  onLoad() {
    this.initAllData()
  },

  async initAllData() {
    // cart.cartToWeackMap()
    const index = getApp().global_data.activeTab
    if(index){
      this.setData({
        activeTab:index
      })
      getApp().global_data.activeTab=0
    }
    const vtabs = await Category.getAllCategory()
    // console.log(vtabs)
    // this.refreshVtabs(vtabs)
    this.setData({vtabs})
  },

  // async refreshVtabs(vtabs){
  //   console.log(cart)
  //   const cartData = await cart.getAllCartItemFromLocal();
  //   const cartItems = cartData.items;
  //   console.log("cartItems")
  //   console.log(cartItems)
  //   cartItems.forEach((item)=>{
  //     // 向vatabs中的item添加cartCount属性
  //     // vatabs[item.]
  //   })
  // },
  onTabCLick(e) {
    const index = e.detail.index
    console.log('tabClick', index)
  },

  onChange(e) {
    const index = e.detail.index
    console.log('change', index)
  },
  onShowDetail(e){
    console.log(e)
    this.getSkuDetail(e.detail.skuId)
    this.setData({
      showPopup:true
    })
  },
async getSkuDetail(id){

  const detail = await Spu.getDetail(id)
  console.log(detail)

  this.setData({
    skuItem:detail
  })
},

  onAddToCart(){
    if(!locker.getLocker()){
      return
    }
    const chosenSku = this.data.skuItem
    const cart = new Cart()
    const cartItem = new CartItem(chosenSku, 1)
    cart.addItem(cartItem)
    this.setData({
      showPopup:false
    })
    //TODO: 还需更新对应的item组件
    locker.releaseLocker()
  },
})
