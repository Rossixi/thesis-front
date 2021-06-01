import request from '@/utils/request'

export default {
  getCollegeInfo() {
    return request({
      url: '/college/getList',
      method: 'get'
    })
  }
}
