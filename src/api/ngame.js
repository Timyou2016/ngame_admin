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



