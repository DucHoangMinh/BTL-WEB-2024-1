<script setup>
import 'vue-toast-notification/dist/theme-sugar.css';
const route = useRoute()
const notDisplayHeaderAndFooterPage = ['/auth/login', '/auth/register']
</script>

<template lang="pug">
div
  loading-over-lay
  header-bar(v-if="!notDisplayHeaderAndFooterPage.includes(route.path)")
  slot
  footer-bar(v-if="!notDisplayHeaderAndFooterPage.includes(route.path)")
</template>

<style scoped lang="sass">
</style>