// pages/center/center.js
import request from '../../utils/request'
let startY;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    translateY: '',
    transition: '',
    userInfo: {},
    recordList: [],
  },

  // 点击头像登录
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  handlerStart(event) {
    // 获取初始位置
    startY = event.touches[0].clientY;
    this.setData({
      transition: ''
    })
  },
  handlerMove(event) {
    // 移动的距离
    let disY = event.touches[0].clientY - startY;
    if (disY < 0) disY = 0;
    if (disY > 200) disY = 200
    this.setData({
      translateY: disY + 'rpx'
    })
  },
  handlerEnd() {
    this.setData({
      translateY: '',
      transition: "transform 1s",
    })
  },
  // 获取最近播放
  async getPlayHistory() {
    const uid = this.data.userInfo.userId;
    const res = await request('/user/record', {
      uid,
      type: 0
    });
    console.log(res);
    if (res.code === 200) {
      this.setData({
        recordList: res.allData.slice(0, 20).map(item => item.song.al),
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo_key')
    })
    if (this.data.userInfo.nickname) {
      this.getPlayHistory();
    }
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