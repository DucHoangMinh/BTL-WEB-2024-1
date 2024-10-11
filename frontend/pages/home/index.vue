<template lang="pug">
div
  .banner-slide
    .banner-image-wrapper.position-relative
      .banner-image
        img(:src="banner_images[current_banner_selected]")
      .banner-button.d-flex.justify-space-between.position-absolute
        .prev-button.pa-4(@click="current_banner_selected = current_banner_selected > 0 ? current_banner_selected - 1 : banner_images.length - 1")
          v-icon.banner-button-icon mdi mdi-chevron-left
        .next-button.pa-4(@click="current_banner_selected = current_banner_selected < banner_images.length - 1 ? current_banner_selected + 1 : 0")
          v-icon.banner-button-icon mdi mdi-chevron-right
    v-container
      .film-list
        v-row.film-filter-tab.justify-center
          v-col(cols="4" @click="current_list_selected = 'phim-dang-chieu'"
            :class="{'film-filter-tab-item-current-select' : current_list_selected == 'phim-dang-chieu'}").film-filter-tab-item.text-center
            p.film-filter-title Phim đang chiếu
          v-col(cols="4" @click="current_list_selected = 'phim-sap-chieu'"
            :class="{'film-filter-tab-item-current-select' : current_list_selected == 'phim-sap-chieu'}").film-filter-tab-item.text-center
            p.film-filter-title Phim sắp chiếu
          .film-filter-tab-item


</template>
<script setup>
const current_banner_selected = ref(0)
const banner_images = ref([
    '/img/home/banner/co_dau_hao_mon.png',
    '/img/home/banner/quy_an_tang_2.jpg',
    '/img/home/banner/robot_hoang_da.jpg',
    '/img/home/banner/treu_roi_yeu.jpg'
])
const current_list_selected = ref('phim-dang-chieu')
</script>
<style scoped lang="sass">
.banner-button
  top: 46%
  width: 100%
.prev-button,
.next-button
  border-radius: 50%
.prev-button:hover,
.next-button:hover
  background-color: rgba(255, 255, 255, 0.1)
.banner-button-icon
  font-size: 3rem
  cursor: pointer
  color: #333333

.film-filter-tab-item
  cursor: pointer
  border-bottom: 5px solid #ccc
.film-filter-tab-item-current-select
  border-bottom: 5px solid #000000 !important
.film-filter-tab-item:hover
  background-color: rgba(255, 255, 255, 0.7)
.film-filter-title
  font-size: 30px
  font-family: Oswald, sans-serif !important
  line-height: 1.5em
</style>