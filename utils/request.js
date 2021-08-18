import config from '../utils/config'

function request(path, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + path,
      method,
      data,
      success: (res) => {
        resolve(res.data);
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

export default request