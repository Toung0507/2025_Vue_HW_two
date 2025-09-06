<script setup>
import { computed, ref } from 'vue';
import TodoItem from './TodoItem.vue';

const props = defineProps({
  todos: {
    type: Array,
    required: true,
  }
})

const emit = defineEmits(['del-todo']);

const filterStatus = ref('all');

// 箭頭函數下，若有多行則需要用 {} 並搭配 return
const filterTodos = computed(() => {
  switch (filterStatus.value) {
    case 'noFinish':
      return props.todos.filter(todo => !todo.status);
    case 'finish':
      return props.todos.filter(todo => todo.status);
    default:
      return props.todos;
  }
});

// 箭頭函數下，若只有單行，可不用 {} 包覆
const noFinishNum = computed(() =>
  props.todos.filter(todo => !todo.status)
);

</script>

<template>
  <div class="todoList_list">
    <ul class="todoList_tab">
      <li>
        <!-- 三元運算子 -->
        <a href="#" :class="filterStatus === 'all' ? 'active' : ''" @click.prevent="filterStatus = 'all'">
          全部
        </a>
      </li>
      <li>
        <!-- 物件寫法 ， 代表條件成立時，會有前面想要的 class 可用 , 增加多個判斷，較簡潔 -->
        <a href="#" :class="{ active: filterStatus === 'noFinish' }" @click.prevent="filterStatus = 'noFinish'">
          待完成
        </a>
      </li>
      <li>
        <a href="#" :class="{ active: filterStatus === 'finish' }" @click.prevent="filterStatus = 'finish'">
          已完成
        </a>
      </li>
    </ul>
    <div class="todoList_items">
      <!-- ul 放在這邊就好，不需要多拆過去 -->
      <ul class="todoList_item">
        <TodoItem v-for="todo in filterTodos" :key="todo.id" :todo="todo" @del-todo="emit('del-todo', $event)">
        </TodoItem>
      </ul>
      <div class="todoList_statistics">
        <p> {{ noFinishNum.length }} 個未完成項目</p>
      </div>
    </div>
  </div>
</template>
