<script setup>
const route = useRoute()
const notDisplayHeaderAndFooterPage = ['/auth/login', '/auth/register']
</script>

<template lang="pug">
div
  header-bar(v-if="!notDisplayHeaderAndFooterPage.includes(route.path)")
  slot
  footer-bar(v-if="!notDisplayHeaderAndFooterPage.includes(route.path)")
</template>

<style scoped lang="sass">
</style>