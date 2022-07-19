import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    nickname: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    id: 0,
    is_gm: 0,
    auth:0
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },  
  SET_NAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_AVATAR: (state, avatar) => {
    if (avatar !== '') {
      state.avatar = avatar
    }
  },
  SET_ISGM: (state, is_gm) => {
    state.is_gm = is_gm
  },  
  SET_AUTH: (state, auth) => {
    state.auth = auth
  },  
  
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    console.log(account, password)
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password, lang: 'zh_cn' }).then(response => {
        const { data } = response
        console.log(data)
        commit('SET_TOKEN', data.token)
        commit('SET_ID', data.id)
        commit('SET_NAME', data.nickname)
        commit('SET_AVATAR', data.avatar)
        commit('SET_ISGM', data.is_gm)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo({rad:"auth"}).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const {id, nickname, avatar } = data
        commit('SET_ID', id)
        commit('SET_NAME', nickname)
        commit('SET_AVATAR', avatar)
        commit('SET_ISGM', data.is_gm)
        commit('SET_AUTH', 1)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

