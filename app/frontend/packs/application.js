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

document.addEventListener("turbolinks:load", function(event) {
  let el = document.querySelector('#board')
  
  if (el) {
    new Vue({
      el, // es6 el: el key 跟 value 一樣 可以只寫一個就好
      data: {
        lists: JSON.parse(el.dataset.lists)
      },
      components: {
        List    // 註冊 元件 List: List es6 可只寫一個
      }
    })
  } else {

  }
})