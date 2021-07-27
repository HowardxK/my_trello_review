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

document.addEventListener("turbolinks:load", function(event) {
  let el = document.querySelector('#board')
  
  if (el) {
    new Vue({
      el, // es6 el: el key 跟 value 一樣 可以只寫一個就好
      data: {
        lists: JSON.parse(el.dataset.lists)
      },
      components: {
        List,     // 註冊 元件 List: List es6 可只寫一個
        draggable // 註冊 draggable: draggable 前面的 draggable 是命名 後面是套件
      },
      methods: {
        listMoved(event) {
          // console.log(event)
          // 打 api 調整 list 的 oldIndex 和 newIndex
          let data = new FormData()
          data.append("list[position]", event.moved.newIndex + 1)
          // acts_as_list 從 1 開始算 所以 newIndex + 1

          Rails.ajax({
            // /lists/2/move
            // 抓陣列 不需要 + 1
            url: `/lists/${this.lists[event.moved.newIndex].id}/move`,
            type: 'PUT',
            data, // data: data es6 同名只寫一個
            dataType: 'json',
            success: resp => {
              // console.log(resp)
            },
            error: err => {
              console.log(err)
            }
          })
        }
      }
    })
  } else {

  }
})