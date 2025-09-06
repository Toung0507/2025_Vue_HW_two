import { checkout } from '@/utils/api'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import TodoListView from '@/views/TodoListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/todolist',
      name: 'todolist',
      component: TodoListView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)vue3-todolist-token\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );

  if (to.meta.requiresAuth && token) {
    try {
      await checkout();
      next();// 未登入導向 login
    } catch {
      document.cookie = "vue3-todolist-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      next('/login');// 已登入直接到至 todoList
    }
  } else if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next(); // 通過驗證
  }
});

export default router