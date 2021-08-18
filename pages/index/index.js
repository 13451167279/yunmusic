// pages/index/index.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    recommendList: [],
    rankList: []
  },

  async getBannerList() {
    const result = await request('/banner', {
      type: 2
    })
    if (result.code === 200) {
      // console.log(result)
      this.setData({
        bannerList: result.banners
      })
    }
  },

  async getRecommendList() {
    const res = await request('/personalized', {
      limit: 25
    });
    if (res.code === 200) {
      this.setData({
        recommendList: res.result,
      })
    }
  },
  async getRankList() {
    let index = 0;
    const rankList = [];
    while (index < 6) {
      const res = await request('/top/list', {
        idx: index++
      });
      if (res.code === 200) {
        rankList.push({
          id: res.playlist.id,
          name: res.playlist.name,
          tracks: res.playlist.tracks.splice(0, 3)
        })
      }
      this.setData({
        rankList,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBannerList();
    this.getRecommendList();
    this.getRankList();
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