<template lang="pug">
div
  header
    .header-container
      router-link(to="/")
        img(src="/img/main_logo.png", alt="Logo" class="logo")
      nav.navbar
        ul.nav-menu
          li.nav-item
            router-link(to="/phim") Phim
          li.nav-item
            router-link(to="/theaters") Rạp chiếu
          li.nav-item
            router-link(to="/uu-dai") Tin Mới và Ưu Đãi
          li.nav-item
            router-link(to="/your-ticket") Vé của bạn
          li.nav-item(v-if="userInfor.fullName === ''")
            router-link(to="/auth/login") Đăng Nhập
          li.nav-item(v-if="userInfor.fullName === ''")
            router-link(to="/auth/register") Đăng Ký
          li.nav-item(v-else)
            router-link(to="/profile/edit").font-weight-bold Xin chào, {{userInfor.fullName}}
</template>
<script setup>
import {userInforStore} from "~/stores/userInfor.js";
const userInforStoreRef = userInforStore()
const userInfor = ref({})
const checkUserInforValue = () => {
  userInfor.value = userInforStoreRef.getUserInfor
  if(userInfor.value.token === "") console.log("Chua dang nhap")
}
onMounted(checkUserInforValue)
</script>
<style scoped lang="sass">
/* Header styles */
.header-container
  display: flex
  justify-content: space-between
  align-items: center
  padding: 20px
  background-color: white
  border-bottom: 1px solid #eaeaea

.logo
  width: 150px

.navbar
  ul.nav-menu
    list-style: none
    display: flex
    gap: 20px

    li.nav-item
      a
        text-decoration: none
        color: black
        font-weight: bold
        &:hover
          color: #007bff
</style>