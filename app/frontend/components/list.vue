// html
<template>
    <div class="list">
      <h2 class="header">{{ list.name }}</h2>
      <!-- list.name 的 list 來自 props: ["list"] -->

      <div class="deck">
        <Card v-for="card in list.cards" :card="card" :key="card.id"></Card>
        <!-- 為了避免重複加上 :key="card.id" -->
        <!-- :card="card" 的 card 是在 v-for 定義的 card  -->
        <!-- :card 指的是在 card.vue 的 props: ["card"] 會將 card 傳給 :card -->
        <!-- 而 v-for 的 list.cards 來自  application.html.erb 的 data-lists="<%= @lists.to_json(include: :cards) %>" -->
      </div>
    </div>
</template>


// js
<script>
import Card from 'components/card' // 引入 'components/card' 取名叫做 Card

export default {
  name: 'List',
  props: ["list"],     // 設定一個叫做 list 的 property 但需要傳資料進來
  components: {
    Card               // 註冊 元件 Card: Card 前面可以自己取 後面是 import 進來的 Card ， es6 可以只寫一半 
  }
}
</script>

// style
// lang 加入 scss 巢狀功能，scoped 代表 css 只在這個 component 範圍內，不會污染到其他 css
<style lang="scss" scoped>    
.list {
  @apply .bg-gray-300 .mx-2 .w-64 .rounded .px-3 .py-1;

  .header {
    @apply .font-bold;
  }

  .deck {
    @apply .mt-2;
  }
}
</style>