import request from '@/utils/request'
import qs from 'qs';

export function apiReqLogList(data) {
    return request({
      url: 'apiv1/api-req-log',
      method: 'get',
      params: data,
      paramsSerializer:params=>{
        return qs.stringify(params,{indices:false})
      }
    })
  }