<template lang="pug">
.signup-container
  .signup-box
    .logo
      img(src="/img/main_logo.png", alt="Logo")
    h1.title Tạo tài khoản mới
    form(@submit.prevent="null")
      .input-group
        input(type="text", v-model="registerData.firstName", placeholder="First Name", required)
      .input-group
        input(type="text", v-model="registerData.lastName", placeholder="Last Name", required)
      .input-group
        input(type="email", v-model="registerData.email", placeholder="Email", required)
      .input-group
        input(type="password", v-model="registerData.password", placeholder="Password", required)
      .input-group
        input(type="password", v-model="registerData.confirmPassword", placeholder="Confirm Password", required)
      .input-group.mt-8
        input(type="date", v-model="registerData.dateOfBirth", required)
        label.date-label(for="dateOfBirth") Ngày sinh
      .options
        label.agree-terms
          input(type="checkbox", v-model="agreeTerms", required)
          span Tôi đồng ý với điều khoản và điều kiện
      button.signup-button(type="submit" @click="clickRegisterButton") Đăng ký
    .login-link
      | Bạn đã có tài khoản?
      a(href="/auth/login") &nbsp; Đăng nhập
</template>
<script setup>
import showMessages from "~/utils/toast.js";
import axios from "axios";
import {loadingStateStore} from "~/stores/loadingState.js";
const loadingStateStoreRef = loadingStateStore()
const router = useRouter()

const signUp = async () => {
  try {
    loadingStateStoreRef.setLoadingState(true)
    await axios.post("https://api-btl-web-2024-1.vercel.app/register", registerData.value)
    loadingStateStoreRef.setLoadingState(false)
    showMessages.success('Đăng ký thành công, bạn sẽ được chuyển hướng về trang đăng nhập')
    setTimeout(async () => {
      await router.push('/auth/login')
    }, 5000)
  } catch (error) {
    showMessages.error(error.message)
  }
}
const goToLogin = () => {

}
const agreeTerms = ref(false)
const registerData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  dateOfBirth: ''
})

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const clickRegisterButton = async () => {
  const errors = [];
  for (const [key, value] of Object.entries(registerData.value)) {
    if (!value) {
      errors.push(`${key} không được để trống`);
    }
  }
  if (!validateEmail(registerData.value.email)) {
    errors.push('Email không hợp lệ');
  }
  if (registerData.value.password !== registerData.value.confirmPassword) {
    errors.push('Mật khẩu và xác nhận mật khẩu không khớp');
  }
  if (!agreeTerms.value) {
    errors.push('Bạn phải đồng ý với điều khoản và điều kiện');
  }
  if (errors.length) {
    errors.forEach((error) => {
      showMessages.error(error)
    });
    return
  }
  await signUp()
}
</script>
<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem 0;
}

.signup-box {
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
  position: relative;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="date"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.date-label {
  position: absolute;
  top: 0.75rem;
  left: 0rem;
  color: black;
  pointer-events: none;
  transition: 0.2s ease all;
}

input[type="date"]:not(:placeholder-shown) + .date-label,
input[type="date"]:focus + .date-label {
  top: -1.5rem;
  font-size: 0.75rem;
  color: #000;
}

.options {
  margin-bottom: 1rem;
}

.agree-terms {
  display: flex;
  align-items: center;
}

.agree-terms input {
  margin-right: 0.5rem;
}

.signup-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
}

.login-link a {
  color: #1a73e8;
  text-decoration: none;
}
</style>