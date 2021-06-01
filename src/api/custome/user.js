
import request from '@/utils/request'

export default {

  //查询用户信息
  getUserInfoList(page) {
    return request({
      url: '/user/getList/' + page,
      method: 'post'
    })
  },

  //删除用户信息
  removeUserInfoByUserId(userId) {
    return request({
      url: '/user/deleteOne/' + userId,
      method: 'delete'
    })
  },

  //条件获取用户
  getUserInfoListByCond(page, user) {
    return request({
      url: '/user/getUser/' + page,
      method: 'post',
      data: user
    })
  },

  //主键获取用户信息
  getUserInfoById(userId) {
    return request({
      url: '/user/getOneUser/' + userId,
      method: 'get'
    })
  },

  //修改用户信息
  updateUserInfo(user) {
    return request({
      url: '/user/updateOne',
      method: 'put',
      data: user
    })
  },

  //保存用户
  saveUser(user) {
    return request({
      url: '/user/saveOne',
      method: 'post',
      data: user
    })
  }

}
