<template>
  <div class="payment-container">
    <!-- Thông tin đặt vé -->
    <div class="order-summary">
      <img class="movie-poster" :src="moviePoster" alt="Poster phim" />
      <div class="movie-info">
        <h2 class="movie-title">{{ movieName }}</h2>
        <p>
          Ngày chiếu: <span>{{ showDate }}</span>
        </p>
        <p>
          Suất chiếu: <span>{{ showtime }}</span>
        </p>
        <p>
          Rạp chiếu: <span>{{ cinemaName }}</span>
        </p>
        <p>
          Phòng chiếu: <span>{{ screenNumber }}</span>
        </p>
        <p>
          Ghế ngồi: <span>{{ selectedSeats.join(", ") }}</span>
        </p>
      </div>
      <div class="ticket-price">{{ totalPrice }} ₫</div>
    </div>

    <!-- Tổng số tiền -->
    <div class="total-amount">
      <span>Tổng số tiền đặt hàng</span>
      <span class="total-price">{{ totalPrice }} ₫</span>
    </div>

    <!-- Nút Thanh Toán -->
    <div class="payment-section">
      <button class="confirm-payment-button" @click="handlePayment">
        Thanh Toán
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentPage",
  props: {
    movieName: {
      type: String,
      required: false,
      default: "Tên phim chưa có",
    },
    showtime: {
      type: String,
      required: false,
      default: "Suất chiếu chưa có",
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
      default: "Rạp chưa có",
    },
    screenNumber: {
      type: String,
      required: false,
      default: "Screen chưa có",
    },
    showDate: {
      type: String,
      required: false,
      default: "Ngày chiếu chưa có",
    },
    moviePoster: {
      type: String,
      required: false,
      default: "https://via.placeholder.com/100", // Đường dẫn mặc định cho poster phim
    },
  },
  methods: {
    handlePayment() {
      // Hiển thị hộp thoại xác nhận với nội dung "Bạn có chắc chắn muốn thanh toán không?"
      if (window.confirm("Bạn có chắc chắn muốn thanh toán không?")) {
        // Nếu người dùng chọn "OK", tiến hành thanh toán
        //alert("Thanh toán thành công! Cảm ơn bạn đã đặt vé.");
      } 
    },
  },
};
</script>

<style scoped lang="scss">
.payment-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  width: 80%;
  max-width: 800px;
  margin: 40px auto;
}

.order-summary {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.movie-poster {
  width: 100px;
  height: auto;
  border-radius: 8px;
  margin-right: 20px;
}

.movie-info {
  flex-grow: 1;
}

.movie-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.ticket-price {
  font-size: 20px;
  font-weight: bold;
  color: #e50914;
}

.total-amount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  margin-bottom: 20px;
}

.total-price {
  color: #e50914;
}

.payment-section {
  display: flex;
  justify-content: center;
}

.confirm-payment-button {
  padding: 15px 30px;
  background-color: #e50914;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirm-payment-button:hover {
  background-color: #d40813;
  transform: scale(1.05);
}
</style>
