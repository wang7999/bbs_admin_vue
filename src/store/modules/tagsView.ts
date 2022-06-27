import { TagsView } from '@/types/store'
import { Module } from 'vuex'

const tagsView:Module<TagsView, any> = {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  getters: {
    // value: state => {
    //   return state.value
    // }
  },
  mutations: {
    ADD_VISITED_VIEW(state, view) {
      if (state.visitedViews.some((v: { path: any }) => v.path === view.path)) return
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name'
        })
      )
    },
    ADD_CACHED_VIEW(state, view) {
      if (view.name === null) return
      if (state.cachedViews.includes(view.name?.toString())) return
      if (!view.meta?.noCache) {
        state.cachedViews.push(view.name?.toString())
      }
    },
    DEL_VISITED_VIEW(state, view) {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
    },
    DEL_CACHED_VIEW(state, view) {
      if (view.name === null) return
      const index = state.cachedViews.indexOf(view.name?.toString())
      index > -1 && state.cachedViews.splice(index, 1)
    },
    DEL_OTHERS_VISITED_VIEWS(state, view) {
      state.visitedViews = state.visitedViews.filter((v: { meta: { affix: any }; path: any }) => {
        return v.meta?.affix || v.path === view.path
      })
    },
    DEL_OTHERS_CACHED_VIEWS(state, view) {
      if (view.name === null) return
      const index = state.cachedViews.indexOf(view.name?.toString())
      if (index > -1) {
        state.cachedViews = state.cachedViews.slice(index, index + 1)
      } else {
        // if index = -1, there is no cached tags
        state.cachedViews = []
      }
    },
    DEL_ALL_VISITED_VIEWS(state) {
      // keep affix tags
      const affixTags = state.visitedViews.filter((tag: { meta: { affix: any } }) => tag.meta?.affix)
      state.visitedViews = affixTags
    },
    DEL_ALL_CACHED_VIEWS(state) {
      state.cachedViews = []
    },
    UPDATE_VISITED_VIEW(state, view) {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  },
  actions: {
    AddView({ commit }, view) {
      commit('ADD_VISITED_VIEW', view)
      commit('ADD_CACHED_VIEW', view)
    },
    AddVisitedView({ commit }, view) {
      commit('ADD_VISITED_VIEW', view)
    },
    DelView({ commit }, view) {
      commit('DEL_VISITED_VIEW', view)
      commit('DEL_CACHED_VIEW', view)
    },
    DelOtherView({ commit }, view) {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      commit('DEL_OTHERS_CACHED_VIEWS', view)
    },
    DelCachedView({ commit }, view) {
      commit('DEL_CACHED_VIEW', view)
    },
    OtherViews({ commit }, view) {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      commit('DEL_OTHERS_CACHED_VIEWS', view)
    },
    DelAllViews({ commit }) {
      commit('DEL_ALL_VISITED_VIEWS')
      commit('DEL_ALL_CACHED_VIEWS')
    },
    DelAllCachedViews({ commit }) {
      commit('DEL_ALL_CACHED_VIEWS')
    },
    UpdateVisitedView({ commit }, view) {
      commit('UPDATE_VISITED_VIEW', view)
    }
  }
}
export default tagsView
