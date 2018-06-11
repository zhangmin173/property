function mock() {
    let data = {
        success: true,
        data: [
            {
                worker_id: 1,
                worker_name: '用户名称',
                worker_phone: '17357213387'
            },
            {
                worker_id: 2,
                worker_name: '用户名称',
                worker_phone: '17357213387'
            },
            {
                worker_id: 3,
                worker_name: '用户名称',
                worker_phone: '17357213387'
            },
            {
                worker_id: 4,
                worker_name: '用户名称',
                worker_phone: '17357213387'
            },
            {
                worker_id: 5,
                worker_name: '用户名称',
                worker_phone: '17357213387'
            }
        ],
        msg: '请求成功'
    }
    return data
}
module.exports = mock