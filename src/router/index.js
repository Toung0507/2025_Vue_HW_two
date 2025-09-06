import { checkout } from '@/utils/api'
import LoginView from '@/views/LoginView.vue'
import NotFound from '@/views/NotFound.vue'
import RegisterView from '@/views/RegisterView.vue'
import TodoListView from '@/views/TodoListView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: TodoListView,
      meta: { requiresAuth: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },

  ],
})

router.beforeEach(async (to, from, next) => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)vue3-todolist-token\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );

  if ((to.path === '/' || to.path === '/register') && token) {
    try {
      await checkout();          // 驗證 token
      return next('/todolist');  // 驗證 OK → 去待辦頁
    } catch {
      document.cookie = "vue3-todolist-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      return next();
    }
  }

  // 3) 其他頁面直接放行
  return next();
});


export default router