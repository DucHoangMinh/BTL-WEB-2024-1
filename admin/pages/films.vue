<template  lang="pug">
div
  .d-flex.align-items-center.justify-content-between
    h2.mb-0 Danh sách film tại rạp
    base-button(
      :size="'sm'"
      :type="'secondary'"
      :simple="true"
      :height="35"
    ).mr-6 Thêm phim
  base-table(
    :columns="columns",
    :data="films"
  )
</template>

<script>
import axios from 'axios';
import BaseTable from "~/components/BaseTable.vue";
export default {
  name: 'films',
  components: {BaseTable},
  data() {
    return {
      films: [],
      columns: [ {
        value: 'id',
        name: 'ID'
      }, {
        name: "Tên phim",
        value: 'title'
      }, {
        name: "Ngày phát hành",
        value: 'release_date'
      }, {
        name: "Thời lượng",
        value: 'duration'
      }, {
        name: "Đánh giá",
        value: 'rating'
      }, {
        name: "Thể loại",
        value: 'genre'
      }]
    };
  },
  methods: {
    async getFilms() {
      try {
        const {data} = await axios.get('https://api-btl-web-2024-1.vercel.app/movies');
        this.films = data.movies
        this.films.forEach(film => {
          film.release_date = this.formatDateToDDMMYYYY(film.release_date)
          film.duration = `${film.duration} phút`
          film.rating = `${film.rating}/10`
        })
      } catch (e) {

      }
    },
    formatDateToDDMMYYYY(dateString){
      const date = new Date(dateString);

      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
      const year = date.getUTCFullYear();

      return `${day}/${month}/${year}`;
    }
  },
  async mounted() {
    await this.getFilms()
  }
}
</script>

<style scoped>

</style>