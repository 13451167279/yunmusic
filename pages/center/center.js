import request from "../../utils/request";

let startY = 0;
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

  // 获取手指起点位置
  handlerStart(event) {
    this.setData({
      transition: ''
    })
    startY = event.touches[0].clientY;
  },
  //手指移动
  handlerMove(event) {
    let dis = event.touches[0].clientY - startY;
    dis < 0 ? dis = 0 : dis;
    dis > 200 ? dis = 200 : dis
    this.setData({
      translateY: dis + 'rpx',
    })
  },

  // 手指抬起
  handlerEnd(event) {
    this.setData({
      transition: "transform 1s",
      translateY: 0,
    })
  },

  toLogin() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  async getRecordList() {
    const res = await request('/user/record', {
      uid: this.data.userInfo.userId,
      type: 0,
    });
    if (res.code === 200) {
      this.setData({
        recordList: res.allData.slice(0, 20).map(item => item.song.al)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo_key');
    this.setData({
      userInfo,

    })
    if (userInfo.nickname) {
      this.getRecordList();
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