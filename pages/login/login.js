import request from "../../utils/request";

// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
  },

  handleInput(event) {
    const type = event.currentTarget.id;
    const value = event.detail.value;
    this.setData({
      [type]: value,
    })
  },
  async login() {
    const {
      phone,
      password
    } = this.data;
    if (!/^1[3-9]\d{9}$/.test(phone)) return wx.showToast({
      icon: 'error',
      title: '手机号输入有误',
    });
    if (!/^\w{6,20}$/.test(password)) return wx.showToast({
      title: '密码长度错误',
      icon: 'error'
    });
    const res = await request('/login/cellphone', {
      phone,
      password,
      isLogin: true
    })
    if (res.code === 200) {
      wx.showToast({
        title: '登录成功',
      });
      wx.setStorageSync('userInfo_key', res.profile);
      wx.reLaunch({
        url: '/pages/center/center',
      })
    } else if (res.code === 400) return wx.showToast({
      title: '手机号错误',
      icon: 'error'
    });
    else if (res.code === 502) return wx.showToast({
      title: '密码错误',
      icon: 'error'
    })
    else return wx.showToast({
      title: '登录失败',
      icon: 'error',
    })

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