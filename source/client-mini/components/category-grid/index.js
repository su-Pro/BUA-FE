// components/category-grid/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    grid:Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    onGoToCategory(event) {
      console.log("grid-item");
      console.log(event);
      
    
      getApp().global_data.activeTab = event.currentTarget.dataset.index
    wx.switchTab({
      url: `/pages/category/category`
    })
    
    },
  }
})
