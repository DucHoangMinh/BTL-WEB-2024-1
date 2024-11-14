<template>
  <div class="payment-container">
    <!-- Thông tin đặt vé -->
    <div class="order-summary">
      <img class="movie-poster" :src="moviePoster" alt="Poster phim" />
      <div class="movie-info">
        <h2 class="movie-title">{{ movieName }}</h2>
        <div class="info-item">
          <span class="info-label">Ngày chiếu:</span>
          <span class="info-value">{{ showDate }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Suất chiếu: </span>
          <span class="info-value">{{ showtime }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Rạp chiếu: </span>
          <span class="info-value">{{ cinemaName }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Phòng chiếu: </span>
          <span class="info-value">{{ screenNumber }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Ghế ngồi: </span>
          <span class="info-value">{{ selectedSeats.join(", ") }}</span>
        </div>
      </div>
    </div>

    <!-- Tổng số tiền -->
    <div class="total-amount">
      <span class="total-label">Tổng số tiền đặt hàng:</span>
      <span class="total-price">{{ totalPrice.toLocaleString() }} ₫</span>
    </div>

    <!-- Nút Thanh Toán -->
    <div class="payment-section">
      <button class="confirm-payment-button" @click="emit('go_to_payment')">Thanh Toán</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const emit = defineEmits(['go_to_payment'])
// Định nghĩa các props
const props = defineProps({
  movieName: {
    type: String,
    required: false,
    default: 'Tên phim chưa có',
  },
  showtime: {
    type: String,
    required: false,
    default: 'Suất chiếu chưa có',
  },
  selectedSeats: {
    type: Array,
    required: false,
    default: () => [],
  },
  totalPrice: {
    type: Number,
    required: false,
    default: 0,
  },
  cinemaName: {
    type: String,
    required: false,
    default: 'Rạp chưa có',
  },
  screenNumber: {
    type: String,
    required: false,
    default: 'Screen chưa có',
  },
  showDate: {
    type: String,
    required: false,
    default: 'Ngày chiếu chưa có',
  },
  moviePoster: {
    type: String,
    required: false,
    default: 'https://via.placeholder.com/100',
  },
});

// Hàm xử lý thanh toán
const handlePayment = () => {
  if (window.confirm('Bạn có chắc chắn muốn thanh toán không?')) {
    // Nếu người dùng chọn "OK", tiến hành thanh toán
    
  }
};
</script>

<style scoped lang="scss">
.payment-container {
  display: flex;
  justify-content: space-between;
  //align-items: flex-start;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  width: 95%;
 // max-width: 1200px;
  margin: 50px auto;
}

.order-summary {
  display: flex;
  align-items: center;
  background-color: #fafafa;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  width: 50%;
}

.movie-poster {
  width: 120px;
  height: auto;
  border-radius: 12px;
 margin-right: 20px;
}

.movie-info {
  flex-grow: 1;
}

.movie-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.info-item {
  margin-bottom: 10px;
}

.info-label {
  font-weight: 500;
  color: #555;
}

.info-value {
  font-weight: bold;
  color: #222;
}

.total-amount {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  width: 25%;
  margin: 0 20px;
}

.total-label {
  font-size: 18px;
  color: #333;
}

.total-price {
  color: #000000;
  font-size: 22px;
  margin-top: 10px;
}

.payment-section {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 20%;
}

.confirm-payment-button {
  padding: 15px 35px;
  background-color: #000000;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.confirm-payment-button:hover {
  background-color: #d40813;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}
</style>
