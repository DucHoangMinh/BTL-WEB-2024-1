<script setup>
import {useRoute} from "#app";

const route = useRoute()
const router = useRouter()
const checkAuth = () => {
  router.push('/home')
}
onMounted(checkAuth)
</script>

<template lang="pug">
p Hoang Minh Duc
</template>

<style scoped lang="sass">

</style>