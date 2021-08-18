// pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
  },

  handleInput(event) {
    let type = event.currentTarget.id;
    let value = event.detail.value;
    this.setData({
      [type]: value
    })
  },
  // 点击登录
  async login() {
    const {
      phone,
      password
    } = this.data;
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        icon: 'error',
        title: '手机号不合法',
      })
    }
    if (!/^\w{6,20}$/.test(password)) {
      wx.showToast({
        icon: 'error',
        title: '密码输入有误',
      })
    }
    const res = await request('/login/cellphone', {
      phone,
      password,
      isLogin: true
    })
    if (res.code === 200) {
      wx.setStorageSync('userInfo_key', res.profile)
      wx.reLaunch({
        url: '/pages/center/center',
      })
    } else {
      wx.showToast({
        icon: 'error',
        title: res.message,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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