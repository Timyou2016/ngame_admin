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

export function roleGetPermission(data) {
  return request({
    url: 'apiv1/role/get-permission',
    method: 'get',
    params: data,
    paramsSerializer:params=>{
      return qs.stringify(params,{indices:false})
    }
  })
}

export function roleSetPermission(data) {
    return request({
      url: 'apiv1/role/set-permission',
      method: 'post',
      data: qs.stringify(data,{indices:false})
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
