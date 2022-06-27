import { Module } from 'vuex'
import { App } from '@/types/store'
import { setItem } from '@/utils/storage'

const SIDEBARSTATUS = 'BBS-SIDEBAR-STATUS'
const LANGUAGE = 'BBS-LANGUAGE'
const SIZE = 'BBS-SIZE'

export enum DeviceType {
  Mobile,
  Desktop,
}

const app: Module<App, any> = {
  state: {
    device: '',
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    language: '',
    size: 'medium'
  },
  getters: {
    sidebar: state => {
      return state.sidebar
    }
  },
  mutations: {
    TOGGLE_SIDEBAR(state, withoutAnimation) {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = withoutAnimation
      if (state.sidebar.opened) {
        setItem(SIDEBARSTATUS, 'opened')
      } else {
        setItem(SIDEBARSTATUS, 'closed')
      }
    },
    CLOSE_SIDEBAR(state, withoutAnimation: boolean) {
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
      setItem(SIDEBARSTATUS, 'closed')
    },
    TOGGLE_DEVICE(state, device) {
      state.device = device
    },
    SET_LANGUAGE(state, language: string) {
      state.language = language
      setItem(LANGUAGE, language)
    },
    SET_SIZE(state, size: string) {
      state.size = size
      setItem(SIZE, size)
    }
  },
  actions: {
    ToggleSideBar({ commit }, payload) {
      commit('TOGGLE_SIDEBAR', payload)
    },
    CloseSideBar({ commit }, payload) {
      commit('CLOSE_SIDEBAR', payload)
    },
    ToggleDevice({ commit }, payload) {
      commit('TOGGLE_DEVICE', payload)
    },
    SetLanguage({ commit }, payload) {
      commit('SET_LANGUAGE', payload)
    },
    SetSize({ commit }, payload) {
      commit('SET_SIZE', payload)
    }
  }
}
export default app
