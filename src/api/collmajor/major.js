import request from '@/utils/request'

export default {
  getMajorInfoByCond(major) {
    return request({
      url: '/major/getCondMajor',
      method: 'post',
      data: major
    })
  }
}
