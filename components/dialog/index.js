// components/dialog/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false,
    },
    isPass: {
      type: Boolean,
      value: false,
    }
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
    onRetry: function () {
      this.properties.isShow = false;
      this.setData({ isShow: this.properties.isShow });
    },
    onNext: function () {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('onNext', myEventDetail, myEventOption)
      //隐藏dialog
      this.properties.isShow = false;
      this.setData({ isShow: this.properties.isShow });
    }
  }
})
