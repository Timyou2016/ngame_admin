import request from '@/utils/request'
import qs from 'qs';

export function minigameUserList(data) {
return request({
    url: 'apiv1/minigame/user/list',
    method: 'post',
    data: qs.stringify(data,{indices:false}),     
})
}

export function minigameUserCountList(data) {
    return request({
        url: 'apiv1/minigame/user/count-list',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}
export function minigameLastDaysNewUserCount(data) {
    return request({
        url: 'apiv1/minigame/user/last-days-new-user-count',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}

export function minigameLastDaysActiveUserCount(data) {
    return request({
        url: 'apiv1/minigame/user/last-days-active-user-count',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}
