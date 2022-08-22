import request from '@/utils/request'
import qs from 'qs';

export function minigameGameLog(data) {
return request({
    url: 'apiv1/minigame/log/game-log',
    method: 'post',
    data: qs.stringify(data,{indices:false}),     
})
}

export function minigamePlatLog(data) {
    return request({
        url: 'apiv1/minigame/log/plat-log',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
    }