// components/empty/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        text: {
            type: String,
            value: '暂无相关商品'
        },
        btnText:{
            type:String,
            value:'去逛逛吧'
        },
        show: {
            type: Boolean,
        },
        showBtn:{
            type:Boolean
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    lifetimes: {
        attached() {
            this._init()
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        _init() {
            wx.lin = wx.lin || {};
            wx.lin.showEmpty = (options) => {
                const {
                    btnText = '去逛逛吧',
                    text = '暂无相关商品',
                    showBtn = false
                } = {...options};
                this.setData({
                    btnText,
                    text,
                    showBtn,
                    show: true
                });
            };
            wx.lin.hideEmpty = () => {
                this.setData({
                    show: false
                });
            };
        },
        onTap(event) {
            wx.switchTab({
                url:`/pages/category/category`
            })
        }
    }
})
