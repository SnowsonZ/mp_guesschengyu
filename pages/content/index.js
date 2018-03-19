// pages/content/index.js
var allSelected = require('../../utils/data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectContent: [],
    selectedContent: [
      { "index": 0, "content": "" },
      { "index": 1, "content": "" },
      { "index": 2, "content": "" },
      { "index": 3, "content": "" },
    ],
    pics: [
      "1.jpeg", "2.jpeg", "3.png", "4.png", "5.jpg", "6.jpg", "7.jpeg"
    ],
    correctTexts: ["马到成功", "三心二意", "千里之外", "一箭双雕", "不明觉厉", "鸡同鸭讲", "胆小如鼠"],
    basePath: "/resources/",
    sorted: [],
    curImgUrl: "",
    curCorrectText: "",
    allSelected: allSelected.mtData().list,
    isTrue: false,
    isComplete: false,
  },

  /**
   * 提示
   */

  onPrompt: function () {
    for (let i = 0; i < this.data.selectedContent.length; i++) {
      if (this.data.selectedContent[i].content == "") {
        this.data.selectedContent[i].content = this.data.curCorrectText[i];
        break;
      }
    }
    this.updateState();
  },

  /**
   * 随机生成文字
   */
  generateText: function () {
    //清除上一次数据
    if (this.data.selectContent.length > 0) {
      this.data.selectContent.splice(0, this.data.selectContent.length);
    }
    for (let i = 0; i < this.data.curCorrectText.length; i++) {
      this.data.selectContent.push(this.data.curCorrectText[i]);
    }
    let start = Math.floor(Math.random() * 500);
    for (let i = 0; i < 32 - this.data.curCorrectText.length; i++) {
      let index = (start + i) % this.data.allSelected.length;
      this.data.selectContent.push(this.data.allSelected[index]);
    }
    this.data.selectContent.sort(this.randomSort);
  },

  /**
   * 获取新数据
   */
  generateNewData() {
    if (this.data.sorted.length <= 0) {
      console.log("通关...");
      return;
    }
    for (let i = 0; i < this.data.selectedContent.length; i++) {
      this.data.selectedContent[i].content = "";
    }
    let index = this.data.sorted.shift();
    this.data.curImgUrl = this.data.basePath + this.data.pics[index];
    this.data.curCorrectText = this.data.correctTexts[index];
    this.generateText();
    //更新数据
    this.setData({
      curImgUrl: this.data.curImgUrl,
      curCorrectText: this.data.curCorrectText,
      selectContent: this.data.selectContent,
      selectedContent: this.data.selectedContent
    });
  },

  /**
   * check是否结果
   */
  checkResult: function () {
    for (let i = 0; i < this.data.selectedContent.length; i++) {
      if (this.data.selectedContent[i].content != this.data.curCorrectText[i]) {
        return false;
      }
    }
    return true;
  },

  /**
   * 是否作答完毕
   */
  isCompleted: function () {
    for (let i = 0; i < this.data.selectedContent.length; i++) {
      if (this.data.selectedContent[i].content == "") {
        return false;
      }
    }
    return true;
  },

  /**
   * 作答
   */
  onSelect: function (event) {
    let content = event.target.dataset.content;
    if (!content || this.isCompleted()) {
      return;
    }
    for (let i = 0; i < this.data.selectedContent.length; i++) {
      if (this.data.selectedContent[i].content == "") {
        this.data.selectedContent[i].content = content;
        break;
      }
    }
    this.updateState();
  },

  /**
   * 更新作答状态
   */

  updateState() {
    this.setData({ selectedContent: this.data.selectedContent });
    this.data.isComplete = this.isCompleted();
    if (this.data.isComplete) {
      this.data.isTrue = this.checkResult();
      this.setData({ isTrue: this.data.isTrue });
    }
    this.setData({ isComplete: this.data.isComplete });
  },

  /**
   * 修改答案
   */
  onSelected: function (event) {
    let content = event.target.dataset.content;
    let index = event.target.dataset.id;
    if (content != "") {
      this.data.selectedContent[index].content = "";
      this.setData({ selectedContent: this.data.selectedContent });
    }
  },

  /**
   * 随机排序
   */
  randomSort: function (a, b) {
    return Math.random() > 0.5 ? -1 : 1;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //生成随机排序辅助数组
    for (let i = 0; i < this.data.pics.length; i++) {
      this.data.sorted.push(i);
    }
    this.data.sorted.sort(this.randomSort);
    this.generateNewData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})