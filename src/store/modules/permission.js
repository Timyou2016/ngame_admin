import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param myRouters
 * @param route
 */
function hasPermission(myRouters, route) {
  if (route.name) {
    console.log(route.name)
    console.log(myRouters)
    if(myRouters.includes(route.name) || route.path == "*"){
      return true
    }
    return false
    // return myRouters.includes(route.name)
    // return myRouters.some(router => myRouters.includes(route.name))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, myRouters) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    console.log(tmp)
    if (hasPermission(myRouters, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, myRouters)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, userinfo) {
    const {is_gm,routers} = userinfo
    console.log(is_gm,routers)
    return new Promise(resolve => {
      let accessedRoutes
      if (is_gm == 1) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, routers)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
