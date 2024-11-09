<template>
  <div class="movie-detail">
    <!-- Poster và thông tin phim -->
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

    <!-- Mô tả phim -->
    <div class="movie-description">
      <h2>Tóm tắt</h2>
      <p>{{ movie.description }}</p>
    </div>

    <!-- Thêm component BookingPopup -->
    <BookingPopup 
      :is-open="isBookingPopupOpen"
      :movie-id="movieId"
      @close="closeBookingPopup"
    />
  </div>
</template>

<script setup>
import axios from "axios";

const route = useRoute()
const router = useRouter()
const movie = ref({})
const isBookingPopupOpen = ref(false)
const movieId = ref(null)

const getMovieDetail = async () => {
  try{
    const movieId = route.query.id
    const { data } = await axios.get(`https://api-btl-web-2024-1.vercel.app/movies/${movieId}`)
    movie.value = data.movie
    console.log(movie.value)
  } catch (e){
    console.log(e)
    alert("Có lỗi xảy ra, vui lòng liên hệ với nhà quản trị trang web!")
    await router.push('/')
  }
}
const formatDateToDDMMYYYY = (dateString) =>  {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}
const init = async () => {
  await getMovieDetail()
}
onMounted(init)

const openBookingPopup = () => {
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
