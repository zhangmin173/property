function mock() {
    let data = {
      success: true,
      data: [
        {
          project_id: 1,
          title: '成都',
          project_address: '北京市海淀区复兴路32号院',
          address_y: '116.26719',
          address_x: '39.96554'
        },
        {
          project_id: 2,
          title: '成都园',
          project_address: '北京市丰台区射击场路15号北京园博园',
          address_y: '116.19025',
          address_x: '39.87803'
        }
      ],
      msg: '请求成功'
    }
    return data
  }
  module.exports = mock