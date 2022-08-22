import request from '@/utils/request'
import qs from 'qs';

export function minigameUserList(data) {
return request({
    url: 'apiv1/minigame/user/list',
    method: 'post',
    data: qs.stringify(data,{indices:false}),     
})
}