// html
<template>
    <div class="list">
      <h2 class="header">{{ list.name }}</h2>
      <!-- list.name 的 list 來自 props: ["list"] -->

      <div class="deck">
        <draggable v-model="cards" ghost-class="ghost" group="list" @change="cardMoved">
          <Card v-for="card in cards" :card="card" :key="card.id"></Card>
        </draggable>
        
        <!-- 為了避免重複加上 :key="card.id" -->
        <!-- :card="card" 的 card 是在 v-for 定義的 card  -->
        <!-- :card 指的是在 card.vue 的 props: ["card"] 會將 card 傳給 :card -->
        <!-- 而 v-for 的 list.cards 來自  application.html.erb 的 data-lists="<%= @lists.to_json(include: :cards) %>" -->

        <div class="input-area">
          <button v-if="!editing" class="button" @click="newCard">新增卡片</button>
          <textarea v-if="editing" class="content" v-model="content"></textarea>
          <button v-if="editing" class="button" @click="createCard">建立卡片</button>
          <button v-if="editing" class="button" @click="editing = false">取消</button>
        </div>
      </div>
    </div>
</template>


// js
<script>
import Rails from '@rails/ujs'     // 引入 rails 內建的 ajax
import Card from 'components/card' // 引入 'components/card' 取名叫做 Card
import draggable from 'vuedraggable'

export default {
  name: 'List',
  props: ["list"],     // 設定一個叫做 list 的 property 但需要傳資料進來
  components: {
    Card,               // 註冊 元件 Card: Card 前面可以自己取 後面是 import 進來的 Card ， es6 可以只寫一半 
    draggable   // 註冊 draggable draggable: draggable
  },
  data: function() {
    return {
      content: '',
      cards: this.list.cards,
      editing: false
    }
  },
  methods: {
    cardMoved(event) {
      let evt = event.added || event.moved
      if (evt) {
        let el = evt.element
        let card_id = el.id

        let data = new FormData()
        data.append("card[list_id", this.list.id)
        data.append("card[position]", evt.newIndex + 1) // 陣列與 position 差 1

        Rails.ajax({
          // /cards/2/move
          url: `cards/${card_id}/move`,
          type: 'PUT',
          data, // es6 簡寫 data: data
          dataType: 'json',
          success: resp => {
            console.log(resp)
          },
          error: err => {
            console.log(err)
          }
        })
      }
    },
    
    newCard(event) {
      event.preventDefault()
      this.editing = true;
    },

    createCard(event) {
      event.preventDefault()
     
      // 打 api
      let data = new FormData()
      data.append("card[list_id", this.list.id)
      data.append("card[name]", this.content)

      Rails.ajax({
        url: '/cards',
        type: 'POST',
        data,
        dataType: 'json',
        success: resp => {
          this.cards.push(resp)
          this.content = ""
          this.editing = false
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }
}
</script>

// style
// lang 加入 scss 巢狀功能，scoped 代表 css 只在這個 component 範圍內，不會污染到其他 css
<style lang="scss" scoped>    
.ghost {
  @apply .border-2 .border-gray-400 .border-dashed .bg-gray-200;
}

.list {
  @apply .bg-gray-300 .mx-2 .w-64 .rounded .px-3 .py-3 .flex-none .h-full;

  .header {
    @apply .font-bold;
  }

  .deck {
    @apply .mt-2;
  }

  .input-area {
    @apply .mt-2;

    .content {
      @apply .w-full .p-2 .rounded-sm;

      &:focus {
        @apply .outline-none;
      }
    }
    
    .button {
      @apply .px-3 .py-1 .font-semibold .text-sm .bg-blue-300 .rounded;

      &:focus {
        @apply .outline-none;
      }
    }
  }
}
</style>