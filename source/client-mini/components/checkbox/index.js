// components/checkbox/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        checked: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onCheck(event) {
            let checked = this.properties.checked
            checked = !checked
            this.setData({
                checked
            })
            this.triggerEvent('check', {
                checked
            }, {
                bubbles: true,
                composed: true
            })
        }
    }
})
