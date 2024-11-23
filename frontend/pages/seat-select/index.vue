<template lang="pug">
.seat-select
  v-container
    .seat-select-header.d-flex.align-center.justify-space-between
      h1.title Chọn ghế
      v-btn(
        variant="outlined"
      )
        v-icon mdi mdi-reload
        | Đặt lại
    span.screen.text-center
      p.screen-text Màn hình
    .seat-map
      v-container(style="border-bottom: 5px solid #f9f8f3")
        v-row.align-center.justify-center.flex-column
          v-col(cols="12" v-for="searRow in seatRowList").d-flex.align-center.justify-center
            span.mx-2 {{ searRow }}
            span(v-for="seatColumn in seatColumnList" :key="seatColumn")
              span.single-seat-area.cursor-pointer(@click="() => onChooseSeat(searRow, seatColumn)" :class="{ 'current-selected': currentUserSelected.includes(`${searRow}${seatColumn}`) }")
                v-icon mdi mdi-sofa-single
    v-row.seat-color-guide.my-2
      v-col(cols="6")
        p.seat-guide-text *Nhấp lại vào chỗ ngồi đã chọn để hủy.
      v-col(cols="6").d-flex
        .d-flex.mr-6
          v-icon(style="color: #848484").mr-1 mdi mdi-sofa-single
          p Ghế có thể chọn
        .d-flex.mr-6
          v-icon(style="color: #000000").mr-1 mdi mdi-sofa-single
          p Ghế bạn đã chọn
        .d-flex.mr-6
          v-icon(style="color: #e96106").mr-1 mdi mdi-sofa-single
          p Ghế đã bị mua
    pre-payment(
      :selected-seats="currentUserSelected"
      :total-price="tempPricePerSeat * currentUserSelected.length"
      :movie-name="movieDetail.title"
      :movie-poster="movieDetail.thumbnail"
      @go_to_payment="gotoPayment"
    )
confirmation(
  v-if="openConfirmDialog"
  @cancel="openConfirmDialog = false"
  @confirm="confirmOrderSeat"
  :selected-seats="currentUserSelected"
  :total-price="tempPricePerSeat * currentUserSelected.length"
  :movie-poster="movieDetail.thumbnail"
  :movie-name="movieDetail.title"
)
</template>
<script setup>
import axios from "axios";
import {loadingStateStore} from "~/stores/loadingState.js";
import showMessages from "~/utils/toast.js";

const loadingStateStoreRef = loadingStateStore()
const route = useRoute()
const router = useRouter()

const seatRowList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const seatColumnList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14]

const tempPricePerSeat = 50000
const currentUserSelected = ref([])
const movieDetail = ref({})
const openConfirmDialog = ref(false)
const seatStatusList = ref([])

const confirmOrderSeat = async () => {
  let selectedSeatId = ref([])
  seatStatusList.value.forEach(seat => {
    if(currentUserSelected.value.includes(seat.seat_number)){
      selectedSeatId.value.push(seat.id)
    }
  })
  console.log(selectedSeatId.value)
}

const onChooseSeat = (row, column) => {
  if(currentUserSelected.value.includes(`${row}${column}`)){
    currentUserSelected.value = currentUserSelected.value.filter(seat => seat !== `${row}${column}`)
  } else {
    if(currentUserSelected.value.length >= 10){
      showMessages.warning("Bạn chỉ có thể chọn tối đa 10 ghế!")
      return
    }
    currentUserSelected.value.push(`${row}${column}`)
  }
}

const getSeatStatusList = async () => {
  try {
    const { data } = await axios.get(`https://api-btl-web-2024-1.vercel.app/rooms/${route.query['room']}/seats/showtime/${route.query['showtime']}`)
    seatStatusList.value = data
  } catch (e) {
    console.log(e)
    alert("Có lỗi xảy ra, vui lòng liên hệ với nhà quản trị trang web!")
  }
}
const getMovieDetailById = async () => {
  try {
    const { data } = await axios.get(`https://api-btl-web-2024-1.vercel.app/movies/${route.query['movie_id']}`)
    movieDetail.value = data.movie
  } catch (e){
    console.log(e)
    alert("Có lỗi xảy ra, vui lòng liên hệ với nhà quản trị trang web!")
  }
}
const init = async () => {
  loadingStateStoreRef.setLoadingState(true)
  await getSeatStatusList()
  await getMovieDetailById()
  loadingStateStoreRef.setLoadingState(false)
}
const gotoPayment = async () => {
  if (currentUserSelected.value.length === 0) {
    showMessages.error("Bạn chưa chọn ghế nào!")
    return
  }
  openConfirmDialog.value = true
}
const confirmGotoPayment = async () => {
  router.push('/pay')
}
onMounted(init)
</script>
<style scoped lang="sass">
.screen
  display: block
  width: 100%
  height: 30px
  background-color: #ccc
  margin: 20px 0
.screen-text
  font-size: 20px
  line-height: 30px
.single-seat-area
  margin-right: 4px
  color: #848484
.single-seat-area:hover
  opacity: 0.8
.seat-guide-text
  font-size: 12px
  color: #666
  line-height: 18px
.current-selected
  color: #000000 !important
</style>