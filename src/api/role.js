import request from '@/utils/request'
import qs from 'qs';

export function roleCreate(data) {
  return request({
    url: 'apiv1/role/create',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function roleDelete(data) {
  return request({
    url: 'apiv1/role/delete',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function roleInfo(data) {
  return request({
    url: 'apiv1/role/info',
    method: 'get',
    params: data,
    paramsSerializer:params=>{
      return qs.stringify(params,{indices:false})
    }
  })
}

export function roleRouters(data) {
    return request({
      url: 'apiv1/role/routers',
      method: 'post',
      data: qs.stringify(data),
    })
  }

export function roleList(data) {
  console.log(data)
  return request({
    url: 'apiv1/role/list',
    method: 'get',
    params: data,
    paramsSerializer:params=>{
      return qs.stringify(params,{indices:false})
    }
  })
}
