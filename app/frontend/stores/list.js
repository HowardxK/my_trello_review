import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'
import Rails from '@rails/ujs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists: []
  },

  getters: {
    lists: state => state.lists
  },

  mutations: {
    UPDATE_LISTS(state, lists) {
      state.lists = lists
    }
  },

  actions: {
    moveList({ commit, state }, event) {
      // console.log(event)
      // 打 api 調整 list 的 oldIndex 和 newIndex
      let data = new FormData()
      data.append("list[position]", event.moved.newIndex + 1)
      // acts_as_list 從 1 開始算 所以 newIndex + 1

      Rails.ajax({
        // /lists/2/move
        // 抓陣列 不需要 + 1
        url: `/lists/${state.lists[event.moved.newIndex].id}/move`,
        type: 'PUT',
        data, // data: data es6 同名只寫一個
        dataType: 'json',
        success: resp => {
          console.log(resp)
        },
        error: err => {
          console.log(err)
        }
      })
    },

    loadList({ commit }) {
      Rails.ajax({
        url: '/lists.json',
        type: 'GET',
        dataType: 'json',
        success: resp => {
          console.log('hi')
          commit("UPDATE_LISTS", resp)
          console.log(resp)
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }
})