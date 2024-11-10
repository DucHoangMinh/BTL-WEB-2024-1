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
        .city-item(v-for="city in cities" :key="city" :class="{ active: selectedCity === city }" @click="selectCity(city)")
          span {{ city }}
    
    .format-section
      .format-button.active 2D Phụ Đề Anh
    
    .theaters-section(v-if="selectedCity")
      .theater(v-for="theater in theaters" :key="theater.name")
        .theater-name {{ theater.name }}
        .showtime-list
          .showtime(v-for="time in theater.times" :key="time" @click="selectShowtime(theater, time)")
            span {{ time }}
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
  movieId: Number
})

const emit = defineEmits(['close'])

const today = new Date()
const selectedDate = ref(today.toISOString().split('T')[0])
const selectedCity = ref('')
const cities = ref(['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Đồng Nai'])
const theaters = ref([
  {
    name: 'CGV Vincom Thủ Đức',
    times: ['14:15 PM', '15:20 PM', '16:15 PM', '17:00 PM', '19:45 PM', '21:15 PM', '22:30 PM']
  },
  {
    name: 'CGV Vincom Center Landmark 81',
    times: ['13:30 PM', '15:45 PM', '18:00 PM', '20:15 PM', '22:45 PM']
  }
])

const closePopup = () => {
  emit('close')
}

const selectDate = (date) => {
  selectedDate.value = date
}

const selectCity = (city) => {
  selectedCity.value = city
}

const getWeekday = (date) => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const d = new Date(2023, 10, date)
  return weekdays[d.getDay()]
}

const selectShowtime = (theater, time) => {
  // Xử lý logic chọn suất chiếu
  console.log(`Selected ${time} at ${theater.name}`)
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
    margin-bottom: 20px
    .theater-name
      font-weight: bold
      margin-bottom: 10px
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
</style> 