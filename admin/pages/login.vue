<template lang="pug">
.login-container
  .login-box
    h1.title Đăng nhập 8Movies Admin
    form(@submit.prevent="login")
      .input-group
        input(type="email", v-model="email", placeholder="Email", required)
      .input-group
        input(type="password", v-model="password", placeholder="Password", required)
      button.login-button(type="submit" @click="login") Đăng nhập
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false
    };
  },
  methods: {
    validateLoginData() {
      if (!this.email || !this.password) {
        return { isValid: false, message: "Email và password không được để trống." };
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email)) {
        return { isValid: false, message: "Email không hợp lệ." };
      }
      return { isValid: true, message: "Thông tin hợp lệ." };
    },
    async login() {
      console.log('logging in');
      // Thực hiện logic đăng nhập của bạn ở đây
    },
    async forgotPassword() {
      alert("Chức năng cập nhật ở version sau");
    }
  }
};
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