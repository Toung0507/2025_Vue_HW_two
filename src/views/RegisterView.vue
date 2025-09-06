<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '@/utils/api';
import { swalError, swalSuccess } from '@/utils/swal';

const router = useRouter();

const email = ref('loveliuing@gmail.com')
const nickName = ref('有寧真好')
const password = ref('')
const confirmPwd = ref('')

const handleRegister = async () => {
  try {
    await register(email.value, password.value, nickName.value);
    swalSuccess('註冊成功，請登入')
    router.push('/login');
  } catch (error) {
    const message = error.response.data.message;
    swalError(message);
  }
}

</script>

<template>
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <div class="side">
        <a href="#">
          <img class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt="">
        </a>
        <img class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg">
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">註冊帳號</h2>

          <label class="formControls_label" for="email">Email </label>
          <input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" v-model="email"
            required />

          <label class="formControls_label" for="name">您的暱稱</label>
          <input class="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱" v-model="nickName">

          <label class="formControls_label" for="pwd">密碼</label>
          <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" v-model="password"
            required>

          <label class="formControls_label" for="pwd">再次輸入密碼</label>
          <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請再次輸入密碼"
            v-model="confirmPwd" required>

          <input class="formControls_btnSubmit" type="button" onclick="javascript:location.href='#todoListPage'"
            value="註冊帳號" @click="handleRegister">
          <router-link class="formControls_btnLink" to="/login">登入</router-link>
        </form>
      </div>
    </div>
  </div>
</template>