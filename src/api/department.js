import request from '@/utils/request'
import qs from 'qs';

export function departmentCreate(data) {
  return request({
    url: 'apiv1/department/create',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function departmentDelete(data) {
  return request({
    url: 'apiv1/department/delete',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function departmentInfo(data) {
  return request({
    url: 'apiv1/department/info',
    method: 'get',
    params: data,
    paramsSerializer:params=>{
      return qs.stringify(params,{indices:false})
    }
  })
}


export function departmentList(data) {
  return request({
    url: 'apiv1/department/list',
    method: 'get',
    params: data,
    paramsSerializer:params=>{
      return qs.stringify(params,{indices:false})
    }
  })
}

export function departmentTree(data) {
  return request({
    url: 'apiv1/department/tree',
    method: 'get',
    params: data,
    paramsSerializer:params=>{
      return qs.stringify(params,{indices:false})
    }
  })
}
export function departmentAllParent(data) {
  return request({
    url: 'apiv1/department/parents',
    method: 'get',
    params: data,
    paramsSerializer:params=>{
      return qs.stringify(params,{indices:false})
    }
  })
}
