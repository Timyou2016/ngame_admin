import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard',noCache: true, affix: true}
    }]
  },
]

export const asyncRoutes = [
  {
    path: '/minigame/data',
    component: Layout,
    redirect: 'noRedirect',
    name: 'MinigameData',
    meta: { title: '小游戏数据', icon: 'el-icon-s-data' },
    children: [
      {
        path: 'user/list',
        name: 'MinigameUserList',
        component: () => import('@/views/minigame/user/list'),
        meta: { title: '游戏玩家', icon: 'el-icon-user' ,noCache: true}
      },
      {
        path: 'ssp/plunder',
        name: 'MinigameSspPlunder',
        component: () => import('@/views/minigame/ssp/ssp-plunder'),
        meta: { title: '星舰海盗', icon: 'el-icon-wallet' ,noCache: true}
      },                                                      
    ]
  }, 
  {
    path: '/minigame/config',
    component: Layout,
    redirect: 'noRedirect',
    name: 'MinigameConfig',
    meta: { title: '小游戏配置', icon: 'el-icon-s-data' },
    children: [      
      {
        path: 'game/list',
        name: 'MinigameGameList',
        component: () => import('@/views/minigame/common/game-list'),
        meta: { title: '游戏列表', icon: 'el-icon-s-data' ,noCache: true}
      },  
      {
        path: 'game/edit',
        name: 'MinigameGameEdit',
        hidden: true,
        component: () => import('@/views/minigame/common/game-edit'),
        meta: { title: '编辑游戏', icon: 'form' ,noCache: true}
      },            
      {
        path: 'game/prop/list',
        name: 'MinigameGamePropList',
        component: () => import('@/views/minigame/common/game-prop-list'),
        meta: { title: '游戏道具', icon: 'el-icon-s-ticket' ,noCache: true}
      },  
      {
        path: 'game/prop/edit',
        name: 'MinigameGamePropEdit',
        hidden: true,
        component: () => import('@/views/minigame/common/game-prop-edit'),
        meta: { title: '编辑道具', icon: 'form' ,noCache: true , breadcrumb:false}
      },        
      {
        path: 'game/config/list',
        name: 'MinigameGameConfigList',
        component: () => import('@/views/minigame/common/game-config-list'),
        meta: { title: '游戏配置', icon: 'el-icon-setting' ,noCache: true}
      },
      {
        path: 'game/config/edit',
        name: 'GameConfigEdit',
        hidden: true,
        component: () => import('@/views/minigame/common/game-config-edit'),
        meta: { title: '编辑配置', icon: 'form' ,noCache: true }
      },                                   
    ]
  },    
  {
    path: '/superHero',
    component: Layout,
    redirect: 'noRedirect',
    name: 'SuperHero',
    meta: { title: '超能游戏', icon: 'el-icon-setting' },
    children: [
      {
        path: '/superHero/dragcard',
        name: 'DragCardCon',
        component: () => import('@/views/superHero/dragcard'),
        meta: { title: '抽卡配置', icon: 'table' }
      },
      {
        path: '/superHero/hangup',
        name: 'HangupCon',
        component: () => import('@/views/superHero/hangup'),
        meta: { title: '挂机配置', icon: 'table' }
      },
      {
        path: '/superHero/pve',
        name: 'PveCon',
        component: () => import('@/views/superHero/pve'),
        meta: { title: 'PVE配置', icon: 'table' }
      },           
    ]
  },
  {
    path: '/minigame/log',
    component: Layout,
    redirect: '/minigame/log/game-log',
    name: 'MinigameLog',
    meta: { title: '游戏日志', icon: 'el-icon-view' },
    children: [
      {
        path: 'game-log',
        name: 'MinigameGameLog',
        component: () => import('@/views/minigame/log/game-log'),
        meta: { title: '游戏API日志', icon: 'el-icon-s-data' ,noCache: true}
      },   
      {
        path: 'plat-log',
        name: 'MinigamePlatLog',
        component: () => import('@/views/minigame/log/plat-log'),
        meta: { title: '平台API日志', icon: 'el-icon-s-data' ,noCache: true}
      },            
    ]
  },    
  {
    path: '/account',
    component: Layout,
    redirect: 'noredirect',
    name: 'Account',
    meta: { title: '员工管理', icon: 'el-icon-user' },
    children: [
      {
        path: '/account/list',
        name: 'AccountList',
        component: () => import('@/views/account/list'),
        meta: { title: '账号列表', icon: 'table' ,noCache: true}
      },      
      {
        path: '/account/create',
        name: 'AccountCreate',
        hidden: true,
        component: () => import('@/views/account/create'),
        meta: { title: '编辑账号', icon: 'form' ,noCache: true}
      },           
      {
        path: '/role/index',
        name: 'RoleList',
        component: () => import('@/views/role/index'),
        meta: { title: '角色列表', icon: 'table',noCache: true }
      }, 
 
      {
        path: '/role/setPermission',
        name: 'SetPermission',
        hidden: true,
        component: () => import('@/views/role/permission'),
        meta: { title: '设置权限', icon: 'form' ,noCache: true}
      },        
      {
        path: '/department/index',
        name: 'DepartmentList',
        component: () => import('@/views/department/index'),
        meta: { title: '部门列表', icon: 'table',noCache: true }
      },                          
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: 'noredirect',
    name: 'System',
    meta: { title: '系统管理', icon: 'el-icon-menu' },
    children: [
      {
        path: '/system/regrouter/index',
        name: 'RegrouterList',
        component: () => import('@/views/regrouter/index'),
        meta: { title: '路由列表', icon: 'table',noCache: true }
      },
      {
        path: '/system/apireqlog/index',
        name: 'ApiReqLog',
        component: () => import('@/views/apireqlog/index'),
        meta: { title: 'API日志', icon: 'el-icon-view',noCache: true }
      },     
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }                               
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },  
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }  
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
