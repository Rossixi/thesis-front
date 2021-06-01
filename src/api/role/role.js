import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/auth/getRoles',
    method: 'get'
  })
}
