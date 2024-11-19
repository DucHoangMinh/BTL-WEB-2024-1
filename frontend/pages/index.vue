<script setup>
import {useRoute} from "#app";
import 'vue-toast-notification/dist/theme-sugar.css';

const route = useRoute()
const router = useRouter()
const checkAuth = () => {
  router.push('/home')
}
onMounted(checkAuth)
</script>

<template lang="pug">
</template>

<style scoped lang="sass">

</style>