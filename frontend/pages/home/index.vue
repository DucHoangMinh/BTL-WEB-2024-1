<template lang="pug">
div
  .banner-slide
    .banner-image-wrapper.position-relative
      .banner-image
        img(:src="banner_images[current_banner_selected]" style="width: 100%")
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
        v-row
          v-col(cols="3" v-for="(movie, index) in current_list_selected == 'phim-dang-chieu' ? nowShowingMovies : upComingMovies"
            :key="index" @click="router.push(`/movie/moviedetail?id=${movie.id}`)").film-item(:movie="movie")
            .film-wrapper.cursor-pointer
              .movie-image-preview
                img(:src="movie.thumbnail")
              .movie-name.text-center.my-2
                span {{movie.title}}
              .d-flex.justify-space-around.my-2.align-center
                .movie-release-date.d-flex.align-center
                  v-icon.mr-2 mdi mdi-calendar
                  span {{new Date(movie.release_date).toISOString().split('T')[0]}}
                .movie-release-period.d-flex.align-center
                  v-icon.mr-2 mdi mdi-clock-time-four-outline
                  span {{movie.duration}} PhĂºt
      .promotion-list
        v-row(v-for="(promotion, index) in promotionList" :key="index")
          v-col(cols="4")
            .promotion-item
              img(:src="promotion.thumbnail")

</template>
<script setup>
import axios from "axios";

const route = useRoute()
const router = useRouter()
const current_banner_selected = ref(0)
const banner_images = ref([
  '/img/home/banner/co_dau_hao_mon.png',
  '/img/home/banner/quy_an_tang_2.jpg',
  '/img/home/banner/robot_hoang_da.jpg',
  '/img/home/banner/treu_roi_yeu.jpg'
])
const current_list_selected = ref('phim-dang-chieu')
const promotionList = ref([])
const upComingMovies = ref([])
const nowShowingMovies = ref([])

import {loadingStateStore} from "~/stores/loadingState.js";
const loadingStateStoreRef = loadingStateStore()


const getUpComingMovies = async () => {
  const {data} = await axios.get('https://api-btl-web-2024-1.vercel.app/movies/upcoming')
  upComingMovies.value = data.movies
}
const getNowShowingMovies = async () => {
  const {data} = await axios.get('https://api-btl-web-2024-1.vercel.app/movies/now-showing')
  nowShowingMovies.value = data.movies
}
const getPromotionList = async () => {
  const {data} = await axios.get('https://api-btl-web-2024-1.vercel.app/promotions/')
  promotionList.value = data.promotions
  console.log(promotionList.value)
}
const initData = async () => {
  loadingStateStoreRef.setLoadingState(true)
  await getNowShowingMovies()
  await getUpComingMovies()
  await getPromotionList()
  loadingStateStoreRef.setLoadingState(false)
}
onMounted(initData)
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
.movie-image-preview
  width: 100%
  img
    width: 100%
    height: 100%
.film-wrapper
  border: 1px solid #ccc
  border-radius: 4px
.movie-name
  font-size: 14px
  line-height: 20px
  white-space: nowrap
  text-overflow: ellipsis
  color: #231f20
  font-weight: bold
.movie-release-date,
.movie-release-period
  font-size: 13px
  color: #777
  line-height: 30px
.film-wrapper:hover
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.3)
  transition: 0.3s
</style>