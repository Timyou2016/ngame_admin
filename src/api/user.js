import request from '@/utils/request'
import qs from 'qs';

export function login(data) {
  return request({
    url: '/admin/apiv1/user/login',
    method: 'post',
    data: qs.stringify(data),
  })
}
export function userCreate(data) {
  return request({
    url: '/admin/apiv1/user/create',
    method: 'post',
    data: qs.stringify(data,{indices:false}),     
  })
}

export function userChangePwd(data) {
  return request({
    url: '/admin/apiv1/user/changePwd',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function userDelete(data) {
  return request({
    url: '/admin/apiv1/user/delete',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function getInfo(data) {
  return request({
    url: '/admin/apiv1/user/info',
    method: 'get',
    params: data,
    paramsSerializer:params=>{
      return qs.stringify(params,{indices:false})
    }
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
    params: data,
    paramsSerializer:params=>{
      return qs.stringify(params,{indices:false})
    }
    // data: qs.stringify(data),
  })
}
