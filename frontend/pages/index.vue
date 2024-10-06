<script setup>
import {useRoute} from "#app";

const route = useRoute()
const router = useRouter()
const checkAuth = () => {
  router.push('/auth/login')
}
onMounted(checkAuth)
</script>

<template lang="pug">

</template>

<style scoped lang="sass">

</style>