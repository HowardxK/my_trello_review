// html
<template>
    <div class="list">
      <h2 class="header">{{ list.name }}</h2>
    </div>
</template>


// js
<script>
export default {
  name: 'List',
  props: ["list"]     // 設定一個叫做 list 的 property 但需要傳資料進來
}
</script>

// style
// lang 加入 scss 巢狀功能，scoped 代表 css 只在這個 component 範圍內，不會污染到其他 css
<style lang="scss" scoped>    
.list {
  @apply .bg-gray-300 .mx-2 .w-64 .rounded;

  .header {
    @apply .px-3 .py-1 .font-bold;
  }
}
</style>