<template lang="pug">
div
  header
    .header-container
      a(href="/")
        img(src="/img/main_logo.png", alt="Logo" class="logo")
      nav.navbar
        ul.nav-menu
          li.nav-item
            a(href="/lich-chieu") Lịch Chiếu
          li.nav-item
            a(href="/phim") Phim
          li.nav-item
            a(href="/rap") Rạp
          li.nav-item
            a(href="/gia-ve") Giá Vé
          li.nav-item
            a(href="/uu-dai") Tin Mới và Ưu Đãi
          li.nav-item(v-if="userInfor.fullName === ''")
            a(href="/auth/login") ÄÄƒng nháº­p
          li.nav-item(v-if="userInfor.fullName === ''")
            a(href="/auth/register") ÄÄƒng kĂ½
          li(v-else)
            span.font-weight-bold Xin chĂ o, {{userInfor.fullName}}
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