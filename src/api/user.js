import request from '@/utils/request'
import qs from 'qs';

export function login(data) {
  return request({
    url: '/admin/apiv1/user/login',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function getInfo(data) {
  return request({
    url: '/admin/apiv1/user/info',
    method: 'get',
    params: data
  })
}

export function logout() {
  return request({
    url: '/admin/apiv1/user/logout',
    method: 'post'
  })
}

export function userList(data) {
  console.log(data)
  return request({
    url: 'admin/apiv1/user/list',
    method: 'get',
    params: data
    // data: qs.stringify(data),
  })
}
