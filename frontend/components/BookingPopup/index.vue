<template lang="pug">
.booking-popup(v-if="isOpen")
  .popup-overlay(@click="closePopup")
  .popup-content
    .close-button(@click="closePopup")
      v-icon mdi-close

    .calendar-section
      .date-list
        .date-item(
          v-for="date in dateList"
          :key="date.fullDate"
          :class="{ active: selectedDate === date.fullDate }"
          @click="selectDate(date.fullDate)"
        )
          .month {{ date.month }}
          .day {{ date.day }}
          .weekday {{ date.weekday }}

    .city-section
      .city-list
        .city-item(v-for="city in cities" :key="city" :class="{ active: selectedCity === city.city }" @click="selectCity(city.city)")
          span {{ city.city }}

    .format-section
      .format-button.active 2D Phụ Đề Anh
    
    .theaters-section(v-if="selectedCity").d-flex.pb-4
      .theater(v-for="theater in theaters" :key="theater.name" @click="selectTheater(theater.id)" :class="{ active: selectedTheaterId === theater.id }").pa-2.mr-2
        .theater-name {{ theater.name }}
    .showtime-list.d-flex.flex-wrap
      .showtime(v-for="time in showTimes" :key="id" @click="selectShowtime(time)").mb-2.cursor-pointer
        .showtime-button(v-if="time.id % 13 === 0"  :class="{ active: selectedShowTimeId === time.id }").pa-2.mr-2 {{ time.Room.name }}, {{time.start_time.substring(11, 16)}} - {{time.end_time.substring(11, 16)}}
    div.text-center
      v-btn(variant="outlined" @click="emit('finish_choose_place', {selectedDate: selectedDate.toString(), selectedShowTimeId: selectedShowTimeId, selectedTheaterId: selectedTheaterId, selectedRoomId: selectedRoomId})").text-right
        | Xác nhận
</template>

<script setup>
import axios from "axios";


const props = defineProps({
  isOpen: Boolean,
  movieId: Number
})

const emit = defineEmits(['close', 'finish_choose_place'])

const today = new Date()
const selectedDate = ref(today.toISOString().split('T')[0])
const selectedCity = ref('')
const selectedTheaterId = ref(null)
const selectedShowTimeId = ref(null)
const selectedRoomId = ref(null)
const cities = ref([])
const theaters = ref([])
const showTimes = ref([])

const closePopup = () => {
  emit('close')
}

const selectDate = async (date) => {
  selectedDate.value = date
  cities.value = []
  theaters.value = []
  selectedCity.value = ''
  await getProvinceHaveMovieByDay()
}

const selectCity = async (city) => {
  selectedCity.value = city
  await getTheaterByCityAndDay()
}

const selectTheater = async (theaterId) => {
  selectedTheaterId.value = theaterId
  await getShowTimeByTheater()
}

const getWeekday = (date) => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const d = new Date(2023, 10, date)
  return weekdays[d.getDay()]
}

const selectShowtime = (time) => {
  selectedRoomId.value = time.Room.id
  selectedShowTimeId.value = time.id
}

const dateList = computed(() => {
  const dates = []
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date()
    currentDate.setDate(today.getDate() + i)

    dates.push({
      fullDate: currentDate.toISOString().split('T')[0],
      day: currentDate.getDate(),
      month: months[currentDate.getMonth()],
      weekday: weekdays[currentDate.getDay()]
    })
  }

  return dates
})
const getProvinceHaveMovieByDay = async () => {
  try {
    const {data} = await axios.get(`https://api-btl-web-2024-1.vercel.app/movies/${props.movieId}/cities?date=${selectedDate.value}`)
    cities.value = data.cities
  } catch (e) {
    console.log(e)
  }
}
const getTheaterByCityAndDay = async () => {
  try {
    const {data} = await axios.get(`https://api-btl-web-2024-1.vercel.app/movie-theaters/available/theaters?city=${encodeURIComponent(selectedCity.value)}&movieId=${props.movieId}&date=${selectedDate.value}`)
    theaters.value = data
  } catch (e) {
    console.log(e)
  }
}
const getShowTimeByTheater = async () => {
  try {
    const {data} = await axios.get(`https://api-btl-web-2024-1.vercel.app/showtimes/available?movieId=${props.movieId}&theaterId=${selectedTheaterId.value}&date=${selectedDate.value}`)
    showTimes.value = data.showtimes
  } catch (e) {
    console.log(e)
  }
}
const initData = async () => {
  await getProvinceHaveMovieByDay()
}
onMounted(initData)
</script>

<style scoped lang="sass">
.booking-popup
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 1000

.popup-overlay
  position: absolute
  width: 100%
  height: 100%
  background: rgba(0, 0, 0, 0.5)

.popup-content
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  background: white
  width: 90%
  max-width: 1200px
  max-height: 80vh
  overflow-y: auto
  border-radius: 8px
  padding: 20px

.close-button
  position: absolute
  right: 20px
  top: 20px
  cursor: pointer
  z-index: 1

.calendar-section
  margin-bottom: 20px
  .date-list
    display: flex
    overflow-x: auto
    gap: 10px
    padding: 10px 0
    &::-webkit-scrollbar
      height: 6px
    &::-webkit-scrollbar-track
      background: #f1f1f1
      border-radius: 3px
    &::-webkit-scrollbar-thumb
      background: #888
      border-radius: 3px
    .date-item
      display: flex
      flex-direction: column
      align-items: center
      padding: 10px
      cursor: pointer
      border: 1px solid #ddd
      border-radius: 4px
      min-width: 160px
      &.active
        background: #000
        color: white
      .month
        font-size: 12px
        color: #666
      .day
        font-size: 18px
        font-weight: bold
      .weekday
        font-size: 12px
        color: #666
      &.active
        .month, .weekday
          color: white

.city-section
  margin-bottom: 20px
  .city-list
    display: flex
    flex-wrap: wrap
    gap: 10px
    .city-item
      padding: 8px 16px
      border: 1px solid #ddd
      border-radius: 4px
      cursor: pointer
      &.active
        background: #000
        color: white

.format-section
  margin-bottom: 20px
  .format-button
    display: inline-block
    padding: 8px 16px
    border: 1px solid #ddd
    border-radius: 4px
    &.active
      background: #000
      color: white

.theaters-section
  .theater
    border: 1px solid #000
    border-radius: 4px
    &.active
      background: #000
      color: white
    .theater-name
      font-weight: bold
    .showtime-list
      display: flex
      flex-wrap: wrap
      gap: 10px
      .showtime
        padding: 8px 16px
        border: 1px solid #ddd
        border-radius: 4px
        cursor: pointer
        &:hover
          background: #f5f5f5
  .theater:hover
    background-color: #ccc
    cursor: pointer
.showtime-button
  border: 1px solid black
  border-radius: 4px
.active
  background: #000
  color: white
</style> 