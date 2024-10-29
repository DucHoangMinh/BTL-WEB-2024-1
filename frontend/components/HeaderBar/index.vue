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
          li.nav-item
            a(href="/nhuong-quyen") Nhượng Quyền
          li.nav-item
            a(href="/thanh-vien") Thành Viên
</template>
<script setup>

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