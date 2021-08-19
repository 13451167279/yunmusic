import config from './config'

function request(path, data = {}, method = 'get') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + path,
      data,
      method,
      header: {
        cookie: wx.getStorageSync('cookies_key') && wx.getStorageSync('cookies_key').find(item => item.startsWith('MUSIC'))
      },
      success: (res) => {
        resolve(res.data);
        if (data.isLogin) {
          wx.setStorageSync('cookies_key', res.cookies);
        }
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

export default request;