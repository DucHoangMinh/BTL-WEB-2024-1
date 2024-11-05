<template lang="pug">
v-overlay(v-model="overlay" persistent opacity="0.9")
  div.loading-icon-wrapper.position-relative
    v-progress-linear.position-absolute.loading-icon(indeterminate :size="50" color="white")
</template>
<script setup>
import {loadingStateStore} from "~/stores/loadingState.js";
const loadingStateStoreRef = loadingStateStore()

const overlay = computed(() => {
  return loadingStateStoreRef.getLoadingState
})

</script>
<style scoped lang="sass">
.loading-icon-wrapper
  width: 100vw
  height: 100vh
.loading-icon
  top: 45% !important
  width: 40%
  transform: translateX(-50%)
  left: 50%
</style>