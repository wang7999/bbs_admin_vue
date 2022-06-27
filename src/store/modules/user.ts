import { Module } from 'vuex'
import * as authApi from '../../api/auth'
import { User } from '../../types/store'
import { getItem, setItem } from '../../utils/storage'

const TOKEN = 'BBS-TOKEN'

const user: Module<User, any> = {
  state: {
    token: getItem(TOKEN),
    userInfo: null
  },
  getters: {
    token: state => {
      return state.token
    },
    userInfo: state => {
      return state.userInfo
    }
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
      setItem(TOKEN, payload)
    },
    SET_USERINFO(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    async login({ commit }, payload) {
      const { token }: any = await authApi.login(payload)
      commit('SET_TOKEN', token)
    },
    async getUserInfo({ commit }) {
      const { content }: any = await authApi.getUserInfo()
      commit('SET_USERINFO', content[0])
    }
  }
}
export default user
