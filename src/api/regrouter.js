import request from '@/utils/request'
import qs from 'qs';

export function regrouterCreate(data) {
  return request({
    url: '/admin/apiv1/router/create',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function regrouterDelete(data) {
  return request({
    url: '/admin/apiv1/router/delete',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function regrouterInfo(data) {
  return request({
    url: '/admin/apiv1/router/info',
    method: 'get',
    params: data,
    paramsSerializer:params=>{
      return qs.stringify(params,{indices:false})
    }
  })
}


export function regrouterList(data) {
  return request({
    url: 'admin/apiv1/router/list',
    method: 'get',
    params: data,
    paramsSerializer:params=>{
      return qs.stringify(params,{indices:false})
    }
  })
}

export function regrouterTree(data) {
  return request({
    url: 'admin/apiv1/router/tree',
    method: 'get',
    params: data,
    paramsSerializer:params=>{
      return qs.stringify(params,{indices:false})
    }
  })
}
export function regrouterAllParent(data) {
  return request({
    url: 'admin/apiv1/router/parents',
    method: 'get',
    params: data,
    paramsSerializer:params=>{
      return qs.stringify(params,{indices:false})
    }
  })
}
