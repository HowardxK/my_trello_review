import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

import 'scripts'
import 'styles'

// vue.js

import Vue from 'vue/dist/vue.esm'
import List from 'components/list' // 引入 'components/list' 取名 List(可任取名)
// import Rails from '@rails/ujs'     // 引入 rails 內建的 ajax 上面已經 import 了
import draggable from 'vuedraggable' // 引入 vuedraggable 實作 拖拉效果
import store from 'stores/list'
import { mapGetters, mapActions } from 'vuex'

document.addEventListener("turbolinks:load", function(event) {
  let el = document.querySelector('#board')
  
  if (el) {
    new Vue({
      el, // es6 el: el key 跟 value 一樣 可以只寫一個就好
      store, // store: store
      computed: {
        // ...mapGetters(["lists"])
        lists: {
          get() {
            return this.$store.state.lists
          },

          set(value) {
            this.$store.commit('UPDATE_LISTS', value)
          }
        }
      },
      // data: {
      //   // lists: JSON.parse(el.dataset.lists) 使用 vue 的 life cycle 改寫
      //   lists: []
      // },
      components: {
        List,     // 註冊 元件 List: List es6 可只寫一個
        draggable // 註冊 draggable: draggable 前面的 draggable 是命名 後面是套件
      },
      methods: {
        ...mapActions(["loadList", "moveList"])
      },
      beforeMount() {
        this.loadList()
        // Rails.ajax({
        //   url: '/lists.json',
        //   type: 'GET',
        //   dataType: 'json',
        //   success: resp => {
        //     this.lists = resp
        //     // console.log(resp)
        //   },
        //   error: err => {
        //     console.log(err)
        //   }
        // })
      }
    })
  } else {

  }
})