import { Module } from 'vuex'
import { Permission } from '@/types/store'
import * as authApi from '../../api/auth'
import { getTreeArr } from '../../utils'
import Layout from '@/views/layout/index.vue'

const modules = import.meta.glob('@/views/**/*.vue')

console.log(modules, 'modules')

// 得到页面路径
const getPath = (arr: any[], child: { pid: any }, code: string) => {
  const pItem = arr.find(item => child.pid === item.id)
  // 当前元素还存在父节点, 且父节点不为根节点
  if (arr.find(item => pItem.pid === item.id && item.pid > -1)) {
    getPath(arr, pItem, `${pItem.code}/${code}`)
  } else {
    return `${pItem.code}/${code}`
  }
}
const dashboard = {
  id: 0,
  pid: 0,
  path: '/',
  component: Layout,
  meta: { title: '首页', code: 'dashboard', icon: '' },
  redirect: '/dashboard',
  children: [{
    pid: 1,
    path: '/dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    name: 'dashboard',
    meta: { title: '首页', code: 'dashboard', icon: 'icon-shouye', affix: true }
  }]
}

const permission: Module<Permission, any> = {
  state: {
    menus: [],
    baseMenus: [],
    dataPerms: []
  },
  getters: {
    menu: state => {
      return state.menus
    }
  },
  mutations: {
    SET_MENU(state, payload) {
      state.menus = payload
    },
    SET_BASEMENU(state, payload) {
      state.baseMenus = payload
    },
    // 设置数据权限
    SET_DATAPERMS: (state, dataPerms) => {
      state.dataPerms = dataPerms
    }
  },
  actions: {
    async getPermissions({ commit }, payload) {
      const { content: { dataPerms, mod }}: any = await authApi.getPermissions()
      const menu = mod.filter((item: { pid: number }) => item.pid > -1)
      const _dataPerms = dataPerms.map((item: { code: any }) => item.code)

      // 将菜单数据处理成可挂载的路由数据
      const baseMenu = menu.map((item: any, index: number) => {
        // 设置页面对应的组件 对应组件: -1. 根节点 1. 页面组件 2.默认布局 3456...扩展布局
        switch (item.component) {
          case -1:
            console.log('根节点，已经过滤掉了')
            break
          case 1:
            item.component = modules[`../../views/${getPath(menu, item, item.code)}/index.vue`]
            break
          case 2:
            item.component = Layout
            break
          default:
            item.component = () => import('@/views/errorPage/401.vue')
            break
        }
        return ({
          id: item.id,
          pid: item.pid,
          path: '/' + item.code, // 设置对应的页面路径
          component: item.component,
          name: item.name + index, // 使路由名字具有唯一性
          meta: {
            title: item.name,
            code: item.code,
            icon: item.icon,
            id: item.id
          },
          sort: item.sort
        })
      })
      // 数据排序
      baseMenu.sort((a: any, b: any) => a.sort - b.sort)
      // 得到树状数组
      const treeMenu = getTreeArr({ key: 'id', pKey: 'pid', data: baseMenu, jsonData: false })
      // 得到静态目录
      const _treeMenu = [dashboard, ...treeMenu]

      console.log(_treeMenu, '_treeMenu')
      commit('SET_MENU', _treeMenu)
      commit('SET_BASEMENU', baseMenu)
      commit('SET_DATAPERMS', _dataPerms)
      return _treeMenu
    }
  }
}
export default permission
