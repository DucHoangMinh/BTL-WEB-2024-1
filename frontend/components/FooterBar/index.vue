<template lang="pug">
div
  footer
    .footer-container
      .footer-section
        img(src="/img/main_logo.png", alt="Logo")
        ul
          li
            a(href="/tuyen-dung") Tuyển dụng
          li
            a(href="/gioi-thieu") Giới thiệu
          li
            a(href="/lien-he") Liên hệ
          li
            a(href="/faq") F.A.Q
          li
            a(href="/hoat-dong-xa-hoi") Hoạt động xã hội
          li
            a(href="/dieu-khoan-su-dung") Điều khoản sử dụng
          li
            a(href="/chinh-sach-thanh-toan") Chính sách thanh toán, đổi trả - hoàn vé
          li
            a(href="/lien-he-quang-cao") Liên hệ quảng cáo
          li
            a(href="/dieu-khoan-bao-mat") Điều khoản bảo mật
          li
            a(href="/huong-dan-dat-ve") Hướng dẫn đặt vé online
      .footer-section
        h3 Cụm Rạp 8MOVIES
        ul
          li
            a(href="/rap1") 8MOVIES Ung Văn Khiêm, TP Hồ Chí Minh - Hotline: 0969 874 873
          li
            a(href="/rap2") 8MOVIES Lào Cai - Hotline: 0358 968 970
          // Add the rest of the theater locations similarly
      .footer-section
        h3 Kết Nối Với Chúng Tôi
        div.social-icons
          a(href="https://facebook.com") Facebook
          a(href="https://youtube.com") YouTube
          a(href="https://instagram.com") Instagram
        img(src="https://betacinemas.vn/Assets/Common/logo/dathongbao.png" alt="Đã thông báo bộ công thương")
      .footer-section
        h3 Liên Hệ
        p Công ty cổ phần 8MOVIES Media
        p Giấy chứng nhận ĐKKD số: 0106633482 - Đăng ký lần đầu ngày 08/09/2014 tại Sở Kế hoạch và Đầu tư Thành phố Hà Nội
        p Địa chỉ: Tầng 3, số 595, đường Giải Phóng, phường Giáp Bát, quận Hoàng Mai, TP Hà Nội
        p Hotline: 1900 636807 / 0934 632682
        p Email: mkt@8movies.vn
        p Liên hệ hợp tác kinh doanh: bachtx@8moviesgroup.vn
</template>

<script setup>

</script>

<style scoped lang="sass">
/* Footer styles */
.footer-container
  display: flex
  justify-content: space-between
  padding: 20px
  background-color: #f5f5f5
  color: #333
  font-size: 14px

.footer-section
  flex: 1
  padding: 0 10px

ul
  list-style-type: none
  padding: 0

li
  margin-bottom: 8px

a
  text-decoration: none
  color: #007bff
  &:hover
    text-decoration: underline

.social-icons
  display: flex
  gap: 10px

img
  width: 150px
  margin-top: 10px
</style>
