<script setup>
import { onMounted, ref } from 'vue';
import TodoForm from '@/components/TodoForm.vue';
import TodoList from '@/components/TodoList.vue';
import { addTodoApi, delTodoApi, getTodo, logout } from '@/utils/api';
import { useRouter } from 'vue-router';
import { swalError } from '@/utils/swal';

const router = useRouter();

const todos = ref([]);

const nickname = document.cookie.replace(
  /(?:(?:^|.*;\s*)vue3-todolist-nickname\s*=\s*([^;]*).*$)|^.*$/,
  '$1',
)

onMounted(async () => {
  try {
    const res = await getTodo();
    todos.value = res.data.data;
  } catch (err) {
    console.error('取得待辦列表失敗', err);
  }
});

const addTodo = async (content) => {
  if (content.trim() !== '') {
    try {
      const todo = content.trim();
      const res = await addTodoApi(todo);
      todos.value = [...todos.value, res.data.newTodo];
    } catch (error) {
      console.log(error);
    }
  }
};

const delTodo = async (id) => {
  try {
    await delTodoApi(id);
    todos.value = todos.value.filter(todo => todo.id !== id);
  } catch (error) {
    console.log(error);
  }
}

const handleLogout = async () => {
  try {
    await logout();
    document.cookie = "vue3-todolist-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie = "vue3-todolist-nickname=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    router.push('/');
  } catch (error) {
    const message = error.response.data.message === "Cannot read properties of null (reading 'status')" ? '資料錯誤請洽詢管理員' : '出現不明錯誤';
    swalError(message);
  }
}

</script>

<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm"><a href="#"><span>{{ nickname }}的代辦</span></a></li>
        <li>
          <a href="#" @click.prevent="handleLogout">登出</a>
        </li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <TodoForm @add-todo="addTodo"></TodoForm>
        <TodoList v-if="todos.length" :todos="todos" @del-todo="delTodo"></TodoList>
        <div class="todoList_list" v-else>
          <div class="todoList_items">
            <div class="todoList_statistics">
              <p>目前尚無待辦事項</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
