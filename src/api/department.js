import request from '@/utils/request'
import qs from 'qs';

export function departmentCreate(data) {
  return request({
    url: '/admin/apiv1/department/create',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function departmentDelete(data) {
  return request({
    url: '/admin/apiv1/department/delete',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function departmentInfo(data) {
  return request({
    url: '/admin/apiv1/department/info',
    method: 'get',
    params: data
  })
}


export function departmentList(data) {
  console.log(data)
  return request({
    url: 'admin/apiv1/department/list',
    method: 'get',
    params: data
    // data: qs.stringify(data),
  })
}
