<template>
  <div class="confirmation-container">
    <h1 class="confirmation-title">Xác Nhận Đặt Ghế</h1>   
    <div class="movie-details">
      <h2>Tên Phim: <span>{{ movieName }}</span></h2>
      <p>Suất Chiếu: <span>{{ showtime }}</span></p>
      <p>Ghế Ngồi: <span>{{ selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Không có ghế nào được chọn' }}</span></p>
      <p>Tổng Tiền: <span>{{ totalPrice }} VND</span></p>
    </div>

    <div class="action-buttons">
      <button class="cancel-button" @click="handleCancel">Hủy</button>
      <button class="confirm-button" @click="handleConfirm">Xác Nhận</button>
    </div>
  </div>
</template>


<script>
export default {
  name: "SeatConfirmation",
  props: {
    movieName: {
      type: String,
      required: false, 
      default: "Chưa có tên phim" 
    },
    showtime: {
      type: String,
      required: false, 
      default: "Chưa có suất chiếu" 
    },
    selectedSeats: {
      type: Array,
      required: false, 
      default: () => [] 
    },
    totalPrice: {
      type: Number,
      required: false,
      default: 0 
    }
  },
  methods: {
    handleCancel() {
      
      this.$router.go(-1);
    },
    handleConfirm() {
      
      alert("Xác nhận đặt ghế thành công!");
      this.$router.push('/payment');
    }
  }
};
</script>

<style scoped lang="scss">
.confirmation-container {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  text-align: center;
  margin: 50px auto;
  transition: all 0.3s ease-in-out;
}

.confirmation-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.movie-details {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.movie-details h2, .movie-details p {
  margin: 15px 0;
  color: #444;
  font-size: 18px;
}

.movie-details span {
  font-weight: 600;
  color: #e50914;
}

.action-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

button {
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button {
  background-color: #888;
  color: #fff;

  &:hover {
    background-color: #666;
  }
}

.confirm-button {
  background-color: #e50914;
  color: #fff;
  font-weight: bold;

  &:hover {
    background-color: #d40813;
    transform: scale(1.05);
  }
}
</style>

