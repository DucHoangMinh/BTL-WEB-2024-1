<template>
  <div class="movie-detail">
    <!-- Poster và thông tin phim -->
    <div class="movie-header">
      <img :src="movie.poster" alt="Movie Poster" class="movie-poster" />
      <div class="movie-info">
        <h1>{{ movie.title }}</h1>
        <p><strong>Xem xếp hạng:</strong> {{ movie.rank}}</p>
        <p><strong>Độ tuổi:</strong> {{ movie.age}}</p>
        <p><strong>Thời lượng:</strong> {{ movie.duration }}</p>
        <p><strong>Ngày phát hành:</strong> {{ movie.releaseDate }}</p>
        <p><strong>Thông tin cơ bản:</strong> {{ movie.basicInfor }}</p>
        <p><strong>Loại:</strong> {{ movie.type }}</p>
        <button class="booking-button">Đặt vé</button>
      </div>
    </div>

    <!-- Mô tả phim -->
    <div class="movie-description">
      <h2>Tóm tắt</h2>
      <p>{{ movie.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movie: {
        title: 'Robot Hoang Dã',
        poster: 'https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202410/11482_103_100002.jpg',  // URL của ảnh poster
        rank: '9.2',
        age: 'Dành cho mọi lứa tuổi',
        duration: '102 phút',
        releaseDate: '11-10-2024',
        basicInfor: 'Animation USA',
        type: '2D | Normal | Normal sound | Lồng tiếng, Phụ đề',
        description:
          'Cuộc phiêu lưu hoành tráng theo chân hành trình của một robot — đơn vị ROZZUM 7134, gọi tắt là Roz. Roz vô tình dạt vào hoang đảo sau một sự cố và nơi đây trở thành địa điểm sống mới của cô. Tại đây, Roz kết thân và nhận nuôi một chú ngỗng con, đặt tên là Brightbill. Roz và Brightbill dần dần thân thiết với các bạn thú trên đảo, song sau đó phải chống chọi, bảo vệ “nhà mới” trước sự xâm lăng của nhà máy từng sản xuất ra Roz.',
      },
    };
  },
};
</script>

<style scoped>
.movie-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.movie-header {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  border-bottom: 2px solid #ddd;
  padding-bottom: 20px;
}

.movie-poster {
  width: 300px;
  height: auto;
}

.movie-info {
  flex-grow: 1;
}

.booking-button {
  background-color: #ff6347;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 20px;
}

.booking-button:hover {
  background-color: #e55337;
}

.movie-description {
  margin-top: 30px;
}

.movie-description h2 {
  margin-bottom: 10px;
  font-size: 24px;
}

.movie-description p {
  font-size: 16px;
  line-height: 1.6;
}
</style>
