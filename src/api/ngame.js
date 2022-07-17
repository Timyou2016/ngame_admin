import request from '@/utils/request'
import qs from 'qs';

export function dragcardConSet(data) {
  return request({
    url: 'apiv1/ngame/dragcard/set',
    method: 'post',
    data: qs.stringify(data,{indices:false}),
  })
}


export function dragcardConGet(data) {
  return request({
    url: 'apiv1/ngame/dragcard/get',
    method: 'get',
    params: data,
    paramsSerializer:params=>{
      return qs.stringify(params,{indices:false})
    }
  })
}

export function pveConSet(data) {
  return request({
    url: 'apiv1/ngame/pve/set',
    method: 'post',
    data: qs.stringify(data,{indices:false}),
  })
}


export function pveConGet(data) {
  return request({
    url: 'apiv1/ngame/pve/get',
    method: 'get',
    params: data,
    paramsSerializer:params=>{
      return qs.stringify(params,{indices:false})
    }
  })
}

export function hangupConSet(data) {
  return request({
    url: 'apiv1/ngame/hangup/set',
    method: 'post',
    data: qs.stringify(data,{indices:false}),
  })
}


export function hangupConGet(data) {
  return request({
    url: 'apiv1/ngame/hangup/get',
    method: 'get',
    params: data,
    paramsSerializer:params=>{
      return qs.stringify(params,{indices:false})
    }
  })
}



