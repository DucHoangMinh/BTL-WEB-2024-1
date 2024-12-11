<template lang="pug">
.theaters-list
  .area-wrapper
    .area-list.d-flex.justify-space-around
      span.cursor-pointer(v-for="area in areaList"
        :key="area.id"
        :class="{'selected-area': selectedAreaName == area}"
        @click="() => clickSelectArea(area)").area-item.py-1 {{area}}
  .theater-wrapper
    .theater-name
      v-select(
        :items="theatersByAreaList"
        item-title="name"
        item-value="id"
        v-model="selectedTheaterId"
        return-object
      )
  .calendar-section
    .date-list.justify-center
      .date-item(
        v-for="date in dateList"
        :key="date.fullDate"
        :class="{ active: selectedDate === date.fullDate }"
        @click="selectDate(date.fullDate)"
      )
        .month {{ date.month }}
        .day {{ date.day }}
        .weekday {{ date.weekday }}

</template>
<script setup>
import showMessages from "~/utils/toast.js";
import axios from "axios";

const areaList = ref([])
const selectedAreaName = ref(null)
const theatersByAreaList = ref([])
const selectedDate = ref(new Date().toISOString().split('T')[0])
const selectedTheaterId = ref('-- Chọn rạp --')

import {loadingStateStore} from "~/stores/loadingState.js";
const loadingStateStoreRef = loadingStateStore()
const today = new Date()
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
const selectDate = async (date) => {
  selectedDate.value = date
}
const clickSelectArea = async (area) => {
  selectedAreaName.value = area
  await getTheatersByArea()
}

const getTheatersByArea = async () => {
  try {
    loadingStateStoreRef.setLoadingState(true)
    const { data } = await axios.get(`https://api-btl-web-2024-1.vercel.app/city/${selectedAreaName.value}/theaters-and-movies`);
    console.log(data)
    theatersByAreaList.value = data.theaters
  } catch (e) {
    showMessages.error(e.message)
  } finally {
    loadingStateStoreRef.setLoadingState(false)
  }
}

const getAreaList = async () => {
  try {
    loadingStateStoreRef.setLoadingState(true)
    const { data } = await axios.get("https://api-btl-web-2024-1.vercel.app/city/cities");
    areaList.value = data.cities
    selectedAreaName.value = areaList.value[0]
    await getTheatersByArea()
  } catch (e) {
    showMessages.error(e.message)
  } finally {
    loadingStateStoreRef.setLoadingState(false)
  }
}
const init = async () => {
  await getAreaList()
}
onMounted(init)
</script>
<style scoped lang="sass">
.area-wrapper
  background-color: #dad2b4
.selected-area
  font-weight: bold
  border-bottom: 2px solid black
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
</style>