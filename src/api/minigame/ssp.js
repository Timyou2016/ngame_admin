import request from '@/utils/request'
import qs from 'qs';

export function minigameSspLastDaysPayedCount(data) {
    return request({
        url: 'apiv1/minigame/ssp/last-days-payed-count',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}