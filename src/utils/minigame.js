import { minigameGameList } from '@/api/minigame/common'

export function gamesMap(status) {
    const gamesMap = {}
    minigameGameList({noPage:1,gte_status:status}).then(response => {
        let list = response.data.list
        list.forEach((item) => {
            console.log(item)               
            gamesMap[item.id] = item.name
        })
        console.log(1111,gamesMap)
    })     
    return gamesMap
}