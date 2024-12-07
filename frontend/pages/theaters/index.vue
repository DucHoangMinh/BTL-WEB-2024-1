<template lang="pug">
.theaters-list
  .area-wrapper
    .area-list.d-flex.justify-space-around
      span.cursor-pointer(v-for="area in areaList"
        :key="area.id"
        :class="{'selected-area': selectedAreaName == area}"
        @click="() => clickSelectArea(area)").area-item.py-1 {{area}}

</template>
<script setup>
import showMessages from "~/utils/toast.js";
import axios from "axios";

const areaList = ref([])
const selectedAreaName = ref('')
const theatersByAreaList = ref([])

const clickSelectArea = async (area) => {
  selectedAreaName.value = area
  await getTheatersByArea()
}

const getTheatersByArea = async () => {
  try {
    const { data } = await axios.get(`https://api-btl-web-2024-1.vercel.app/city/${selectedAreaName.value}/theaters-and-movies`);
    console.log(data)
  } catch (e) {
    showMessages.error(e.message)
  }
}

const getAreaList = async () => {
  try {
    const { data } = await axios.get("https://api-btl-web-2024-1.vercel.app/city/cities");
    areaList.value = data.cities
  } catch (e) {
    showMessages.error(e.message)
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
</style>