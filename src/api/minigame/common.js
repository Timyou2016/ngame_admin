import request from '@/utils/request'
import qs from 'qs';

export function minigameGameList(data) {
return request({
    url: 'apiv1/minigame/common/game-list',
    method: 'post',
    data: qs.stringify(data,{indices:false}),     
})
}

export function minigameGetGame(data) {
    return request({
        url: 'apiv1/minigame/common/get-game',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}

export function minigameEditGame(data) {
    return request({
        url: 'apiv1/minigame/common/edit-game',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}

export function minigameGamePropList(data) {
    return request({
        url: 'apiv1/minigame/common/game-prop-list',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}

export function minigameGamePropEdit(data) {
    return request({
        url: 'apiv1/minigame/common/edit-game-prop',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}

export function minigameGetGameProp(data) {
    return request({
        url: 'apiv1/minigame/common/get-game-prop',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}

export function minigameGamePropDelete(data) {
    return request({
        url: 'apiv1/minigame/common/delete-game-prop',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}

export function minigameGameConfigList(data) {
    return request({
        url: 'apiv1/minigame/common/game-config-list',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}

export function minigameGameConfigEdit(data) {
    return request({
        url: 'apiv1/minigame/common/edit-game-config',
        method: 'post',
        headers:{"Content-Type":"application/json"},
        data:data,
        // data: qs.stringify(data,{indices:false}),     
    })
}

export function minigameGetGameConfig(data) {
    return request({
        url: 'apiv1/minigame/common/get-game-config',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}

export function minigameDeleteGameConfig(data) {
    return request({
        url: 'apiv1/minigame/common/delete-game-config',
        method: 'post',
        data: qs.stringify(data,{indices:false}),     
    })
}