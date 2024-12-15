<template lang="pug">
  .login-container
    .login-box
      .logo
        img(src="/img/main_logo.png", alt="Logo")
      h1.title Đăng nhập vào tài khoản của bạn
      form(@submit.prevent="login")
        .input-group
          input(type="email", v-model="email", placeholder="Email", required)
        .input-group
          input(type="password", v-model="password", placeholder="Password", required)
        .options
          label.remember-me
            input(type="checkbox", v-model="rememberMe")
            span Ghi nhớ đăng nhập
          a.forgot-password(href="#", @click.prevent="forgotPassword") Quên mật khẩu?
        button.login-button(type="submit" @click="login") Đăng nhập
      .signup-link
        | Bạn chưa có tài khoản?
        a(href="/auth/register") &nbsp; Đăng ký

</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 
import axios from 'axios'; 
const router = useRouter();
import {userInforStore} from "~/stores/userInfor.js";
import {previousPageStore} from "~/stores/previousPage.js";

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const userInforStoreRef = userInforStore()
const previousPageStoreRef = previousPageStore()
import {loadingStateStore} from "~/stores/loadingState.js";
import showMessages from "~/utils/toast.js";
const loadingStateStoreRef = loadingStateStore()

const validateLoginData = () => {
  if (!email.value || !password.value) {
    return { isValid: false, message: "Email và password không được để trống." };
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    return { isValid: false, message: "Email không hợp lệ." };
  }
  return { isValid: true, message: "Thông tin hợp lệ." };
}

const login = async () => {
  try {
    const validateLoginDataResult = validateLoginData()
    if (!validateLoginDataResult.isValid) {
      alert(validateLoginDataResult.message);
      return;
    }

    loadingStateStoreRef.setLoadingState(true)
    const response = await axios.post('http://160.191.50.189:8080/login', {
      email: email.value,
      password: password.value
    });
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);

      userInforStoreRef.setUserInfor({
        id: response.data.user.id,
        fullName: response.data.user.fullName,
        email: response.data.user.email,
        token: response.data.token
      })
      if(previousPageStoreRef.getPreviousPage !== ""){
        await router.push(previousPageStoreRef.getPreviousPage)
      } else {
        await router.push('/');
      }
    } else {
      alert('Đăng nhập thất bại, không nhận được token');
    }
  } catch (error) {
    loadingStateStoreRef.setLoadingState(false)
    console.error('Error during login:', error);
    showMessages.error('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
  } finally {
    loadingStateStoreRef.setLoadingState(false)
  }
};

const forgotPassword = async () => {
  alert("Chức năng cập nhật ở version sau")
}
const signUp = async () => {
  console.log("signing up")
}
</script>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.logo {
  text-align: center;
  margin-bottom: 1rem;
}

.logo img {
  width: 160px;
  height: auto;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #333;
}

.input-group {
  margin-bottom: 1rem;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-me input {
  margin-right: 0.5rem;
}

.forgot-password {
  color: #1a73e8;
  text-decoration: none;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.signup-link {
  text-align: center;
  margin-top: 1rem;
}

.signup-link a {
  color: #1a73e8;
  text-decoration: none;
}
</style>