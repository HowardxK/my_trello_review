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

document.addEventListener("turbolinks:load", function(event) {
  let el = document.querySelector('#board')
  
  if (el) {
    new Vue({
      el, // es6 el: el key 跟 value 一樣 可以只寫一個就好
      data: {
        lists: JSON.parse(el.dataset.lists)
      }
    })
  } else {

  }
})