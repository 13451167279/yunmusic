// pages/video/video.js
import request from '../../utils/request'
Page({



  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    navId: '',
    videoList: [],
  },
  // 获取导航名称
  async getNavList() {
    const res = await request('/video/group/list');
    if (res.code === 200) {
      this.setData({
        navList: res.data.slice(0, 20),
        navId: res.data[0].id
      })
    }
  },
  // 获取视频列表
  async getVideoList() {
    const res = await request('/video/group', {
      id: this.data.navId,
    });
    if (res.code === 200) {
      this.setData({
        videoList: res.datas.map(item => item.data)
      })
    }
  },
  // 切换导航
  cangeNav(event) {
    this.setData({
      // navId: event.currentTarget.id * 1,
      navId: event.currentTarget.dataset.id * 1,
    })
    this.getVideoList();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const userInfo = wx.getStorageSync('userInfo_key')
    await this.getNavList();
    userInfo && userInfo.nickname && this.data.navId && this.getVideoList();
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