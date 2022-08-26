import request from '@/utils/request'
import qs from 'qs';

export function minigameSspLastDaysPayedCount(data) {
    return request({
        url: 'apiv1/minigame/ssp/last-days-payed-count',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}

export function minigameSspUserPlunderReward(data) {
    return request({
        url: 'apiv1/minigame/ssp/user-plunder-reward',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}

export function minigameSspUserPlunder(data) {
    return request({
        url: 'apiv1/minigame/ssp/user-plunder',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}

export function minigameSspUserPlunderLog(data) {
    return request({
        url: 'apiv1/minigame/ssp/user-plunder-log',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}

export function minigameSspTotalPersonSpend(data) {
    return request({
        url: 'apiv1/minigame/ssp/total-person-spend-count',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}

export function minigameSspLastDaysPersonSpend(data) {
    return request({
        url: 'apiv1/minigame/ssp/last-days-person-spend-count',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}