<template lang="pug">
  .login-container
    .login-box
      .logo
        img(src="/img/main_logo.png", alt="Logo")
      h1.title Log into your account
      form(@submit.prevent="login")
        .input-group
          input(type="email", v-model="email", placeholder="Email", required)
        .input-group
          input(type="password", v-model="password", placeholder="Password", required)
        .options
          label.remember-me
            input(type="checkbox", v-model="rememberMe")
            span Remember me
          a.forgot-password(href="#", @click.prevent="forgotPassword") Forgot password?
        button.login-button(type="submit") Log In
      .signup-link
        | Don't have an account?
        a(href="/auth/register") &nbsp; Sign up

</template>
<script setup>
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const login = async () => {
  console.log("login")
}
const forgotPassword = async () => {
  console.log("forgot password")
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