import axios from 'axios'

// Vite 專案中環境變數要以 VITE_ 開頭，才能在程式碼中透過 import.meta.env 存取
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

api.interceptors.request.use((config) => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)vue3-todolist-token\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  )
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

export const checkout = async () => api.get('/users/checkout');

export const register = async (email, password, nickname) => {
  return api.post('/users/sign_up', {
    email,
    password,
    nickname
  })
};

export const login = async (email, password) => {
  return api.post('/users/sign_in', {
    email,
    password
  })
};

export const logout = async () => api.post('/users/sign_out');

export const getTodo = async () => api.get('/todos/');

export const addTodoApi = async (content) => {
  return api.post('/todos/', {
    content
  })
};

export const delTodoApi = async (id) => api.delete(`/todos/${id}`);

export const changeTodoStatus = async (id) => api.patch(`/todos/${id}/toggle`);