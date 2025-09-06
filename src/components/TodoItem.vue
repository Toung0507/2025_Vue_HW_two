<script setup>
import { changeTodoStatus } from '@/utils/api';
import { swalError } from '@/utils/swal';

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['del-todo']);

const handleDelTodo = (id) => {
  emit('del-todo', id);
}

const handleChangeStatus = async (id) => {
  try {
    await changeTodoStatus(id);
    props.todo.status = !props.todo.status;
  } catch (error) {
    const message = error.response.data.message === "Cannot read properties of null (reading 'status')" ? '資料錯誤請洽詢管理員' : '出現不明錯誤';
    swalError(message);
  }
};

</script>

<template>
  <li>
    <label class="todoList_label">
      <input class="todoList_input" type="checkbox" value="true" :checked="todo.status"
        @change="handleChangeStatus(todo.id)" />
      <span>{{ todo.content }}</span>
    </label>
    <a href="#" @click.prevent="handleDelTodo(todo.id)">
      <i class="fa fa-times"></i>
    </a>
  </li>
</template>
