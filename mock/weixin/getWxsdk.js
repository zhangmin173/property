function mock() {
    let data = {
      success: true,
      data: {
        appId: '31313133',
        timestamp: '1231414235',
        nonceStr: '2133',
        signature: '1231313'
      },
      msg: '请求成功'
    }
    return data
  }
  module.exports = mock