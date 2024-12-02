<template>
  <div class="movie-detail">
    <!-- Poster vĂ  thĂ´ng tin phim -->
    <div class="movie-header">
      <img :src="movie.thumbnail" alt="Movie Poster" class="movie-poster" />
      <div class="movie-info">
        <h1>{{ movie.title }}</h1>
        <p><strong>Xem xếp hạng:</strong> {{ movie.rating}}</p>
        <p><strong>Độ tuổi:</strong> {{ movie.age || 'Không giới hạn'}}</p>
        <p><strong>Thời lượng:</strong> {{ movie.duration }} phút</p>
        <p><strong>Ngày phát hành:</strong> {{ formatDateToDDMMYYYY(movie.release_date) }}</p>
        <p><strong>Thông tin cơ bản:</strong> {{ movie.description }}</p>
        <p><strong>Loại:</strong> {{ movie.basic_info }}</p>
        <button class="booking-button" @click="openBookingPopup">Đặt vé</button>
      </div>
    </div>

    <div class="movie-description mb-6">
      <h2>TĂ³m táº¯t</h2>
      <p>{{ movie.description }}</p>
    </div>

    <div class="movie-trailer">
      <h2>Xem trailer</h2>
      <video width="100%" controls :src="movie.trailer">
      </video>
    </div>

    <BookingPopup
        :is-open="isBookingPopupOpen"
        :movie-id="movieId"
        @close="closeBookingPopup"
        v-if="isBookingPopupOpen"
        @finish_choose_place="finishChoosePlace"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import {previousPageStore} from "~/stores/previousPage.js";
import showMessages from "~/utils/toast.js";

const previousPageStoreRef = previousPageStore()

const route = useRoute()
const router = useRouter()
const movie = ref({})
const isBookingPopupOpen = ref(false)
const movieId = ref(null)

const finishChoosePlace = (data) => {
  if (data.selectedTheaterId == null) {
    showMessages.warning("Vui lòng chọn địa điểm và cụm rạp bạn muốn xem phim!")
    return
  }
  if (data.selectedShowTimeId == null) {
    showMessages.warning("Vui lòng chọn khung giờ bạn muốn xem phim!")
    return
  }
  router.push(`/seat-select?room=${data.selectedRoomId}&showtime=${data.selectedShowTimeId}&movie_id=${route.query['id']}&theater_id=${data.selectedTheaterId}`)
}

const getMovieDetail = async () => {
  try {
    const movieId = route.query.id
    const {data} = await axios.get(`https://api-btl-web-2024-1.vercel.app/movies/${movieId}`)
    movie.value = data.movie
    console.log(movie.value)
  } catch (e) {
    console.log(e)
    alert("CĂ³ lá»—i xáº£y ra, vui lĂ²ng liĂªn há»‡ vá»›i nhĂ  quáº£n trá»‹ trang web!")
    await router.push('/')
  }
}
const formatDateToDDMMYYYY = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}
const init = async () => {
  await getMovieDetail()
}
onMounted(init)

const openBookingPopup = async () => {
  if(!checkUserLoggined()){
    if(confirm("Bạn cần đăng nhập để thực hiện chức năng này. Bạn có muốn đăng nhập ngay?")){
      await previousPageStoreRef.setPreviousPage(route.fullPath)
      await router.push('/auth/login')
    } else {
      return
    }
  }
  movieId.value = route.query.id
  isBookingPopupOpen.value = true
}

const closeBookingPopup = () => {
  isBookingPopupOpen.value = false
}
</script>

<style scoped>
.movie-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.movie-header {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  border-bottom: 2px solid #ddd;
  padding-bottom: 20px;
}

.movie-poster {
  width: 300px;
  height: auto;
}

.movie-info {
  flex-grow: 1;
}

.booking-button {
  background-color: #ff6347;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 20px;
}

.trailer-button {
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 20px;
}

.trailer-button:hover {
  background-color: #495057;
}

.booking-button:hover {
  background-color: #e55337;
}

.movie-description {
  margin-top: 30px;
}

.movie-description h2 {
  margin-bottom: 10px;
  font-size: 24px;
}

.movie-description p {
  font-size: 16px;
  line-height: 1.6;
}
</style>