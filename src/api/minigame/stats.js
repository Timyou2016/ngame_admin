import request from '@/utils/request'
import qs from 'qs';

export function minigameStatsLastDaysPayedCount(data) {
    return request({
        url: 'apiv1/minigame/stats/last-days-payed-count',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}