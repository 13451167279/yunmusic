import config from '../utils/config'

function request(path, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + path,
      method,
      data,
      header: {
        cookie: wx.getStorageSync('cookies_key') && wx.getStorageSync('cookies_key').find(item => item.startsWith('MUSIC')),
      },
      success: (res) => {
        if (data.isLogin) {
          wx.setStorageSync('cookies_key', res.cookies)
        }
        resolve(res.data);
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

export default request