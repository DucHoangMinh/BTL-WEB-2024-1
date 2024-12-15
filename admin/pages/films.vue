<template  lang="pug">
div
  .d-flex.align-items-center.justify-content-between
    h2.mb-0 Danh sách film tại rạp
    base-button(
      :size="'sm'"
      :type="'secondary'"
      :simple="true"
      :height="35"
      @click="showAddModel = true"
    ).mr-6 Thêm phim
  base-table(
    :columns="columns",
    :data="films"
  )
  modal(
    :show="showAddModel"
  )
    h2.text-center.mb-0 Thêm phim vào danh sách
    form(@submit.prevent='')
      .row
        .col-md-12
          base-input(type='text' label='Tên phim' placeholder='Em là bà nội của anh' v-model="fileDetail.title" )
        .col-md-12
          v-select(v-model='fileDetail.genre' :items='film_genre' label='Phân loại' chips='' multiple='')
        .col-md-4
          base-input(type='number' label='Thời lượng phim' placeholder='120' v-model="fileDetail.duration" )
        .col-md-3
          base-input(type='number' label='Điểm IMdB' placeholder='0' v-model="fileDetail.ranikng" )
        .col-md-5
          base-input(type='date' label='Ngày ra mắt' placeholder='' v-model="fileDetail.release_date" )
      .row
        .col-md-12
          textarea.form-control(placeholder='Mô tả phim' v-model="fileDetail.description")
        .col-md-12
          v-select(v-model='fileDetail.basic_info' :items='film_basic_info' label='Thể loại' chips='' multiple='')
      .row
        .col-md-4
          base-input(type='file' label='City' placeholder='City')
        .col-md-4
          base-input(type='text' label='Country' placeholder='Country')
        .col-md-4
          base-input(label='Postal Code' placeholder='ZIP Code')
      .row
        .col-md-12
          base-input(label='About Me')
            textarea.form-control(placeholder='ZIP Code')
      base-button.btn-fill(native-type='submit' type='primary')
        | Save
</template>

<script>
import axios from 'axios';
import BaseTable from "~/components/BaseTable.vue";
import Modal from "~/components/Modal.vue";
export default {
  name: 'films',
  components: {Modal, BaseTable},
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
      }],
      showAddModel: false,
      film_genre: ['2D', '3D', 'IMAX','ScreenX','4DX','Dolby Atmos','Phụ đề','Lồng tiếng'],
      film_basic_info: ['Hành động', 'Kinh dị', 'Tình cảm','Hoạt hình','Hài','Tâm lý','Viễn tưởng','Phiêu lưu','Thần thoại','Cổ trang','Chiến tranh','Khoa học viễn tưởng','Hình sự','Thể thao','Âm nhạc','Gia đình','Tài liệu','Chính kịch','Tội phạm','Hồi hộp','Bí ẩn','Lịch sử','Tài liệu','Thể thao','Âm nhạc','Gia đình','Tâm lý','Hành động','Kinh dị','Hài','Tình cảm','Hoạ'],
      fileDetail: {
        title: "",
        genre: [],
        duration: 0,
        rating: 0,
        release_date: "",
        description: "",
        ranikng:"",
        basic_info: [],
        thumbnail: "",
        trailer: "",
        relatedThumbnail: []
      }
    };
  },
  methods: {
    async getFilms() {
      try {
        const {data} = await axios.get('http://localhost:8080/movies');
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