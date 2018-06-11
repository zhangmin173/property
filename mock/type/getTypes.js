function mock() {
    let data = {
      success: true,
      data: [
        {
          type_id: 'aaa',
          type_name: '分类1',
          type_level: '1',
          type_parent_id: null,
        },
        {
          type_id: 'bbb',
          type_name: '分类2',
          type_level: '1',
          type_parent_id: null,
        },
        {
          type_id: 'ccc',
          type_name: '分类1-1',
          type_level: '2',
          type_parent_id: 'aaa',
        },
        {
          type_id: 'ddd',
          type_name: '分类1-2',
          type_level: '2',
          type_parent_id: 'aaa',
        },
        {
          type_id: 'eee',
          type_name: '分类2-1',
          type_level: '2',
          type_parent_id: 'bbb',
        },
        {
          type_id: 'fff',
          type_name: '分类2-2',
          type_level: '2',
          type_parent_id: 'bbb',
        }
      ],
      msg: '请求成功'
    }
    return data
  }
  module.exports = mock
  