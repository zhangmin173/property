function mock() {
  let data = {
    success: true,
    data: {
      work_id: 1,
      work_phone: '17357213387',
      work_user_name: '报修用户名称',
      user_id: 1,
      work_imgs: [

      ],
      work_type_1: '生活',
      work_type_2: '维修',
      work_address: '浙江省杭州市',
      work_address_x: '',
      work_address_y: '',
      work_voice: '',
      voice_time: 30,
      work_status: 1,
      work_worker_id: 1,
      work_worker_name: '接单人',
      work_worker_phone: '12345678910',
      work_worker_note: '晚点上门修理',
      work_delay_time: '2015-05-02',
      work_over_time: '2015-05-02',
      create_time: '2018-05-01',
      update_time: '2018-05-01'
    },
    msg: '请求成功'
  }
  return data
}
module.exports = mock