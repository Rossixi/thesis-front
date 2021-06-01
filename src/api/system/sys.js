import request from '@/utils/request'

export function deletefile(filename) {
  return request({
    url: '/sys/deleteAvatar/' + filename,
    method: 'delete'
  })
}
