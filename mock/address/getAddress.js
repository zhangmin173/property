function mock() {
  let data = {
    success: true,
    data: {
      address_id: 1,
      project_id: 22,
      user_id: 1,
      address_user_name: '用户名称',
      address_phone: '17357213387',
      address_txt_1: '浙江省杭州市',
      address_txt_2: '1幢1单元101室',
      address_x: '112.345634',
      address_y: '36.4536'
    },
    msg: '请求成功'
  }
  return data
}
module.exports = mock