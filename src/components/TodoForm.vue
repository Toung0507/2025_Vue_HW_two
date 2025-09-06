<script setup>
import { ref } from 'vue';

const emit = defineEmits(['add-todo']);

const content = ref('');

// 助教的方式，不帶參數，直接透過 content.value 的方式傳到上層的 add-todo 會更簡潔
const handleAddTodo = (newTodo) => {
  emit('add-todo', newTodo);
  content.value = '';
}
</script>

<template>
  <div class="inputBox">
    <input type="text" placeholder="請輸入待辦事項" v-model="content">
    <a href="#" @click.prevent="handleAddTodo(content)">
      <i class="fa fa-plus"></i>
    </a>
  </div>
</template>