<template>
<v-dialog max-width="800" v-model="openDialog" persistent>
  <template v-slot:default="{ isActive }">
    <div class="confirmation-container">
      <!-- Tiêu đề xác nhận -->
      <h1 class="confirmation-title">Xác Nhận Thanh Toán</h1>

      <!-- Thông tin phim -->
      <div class="order-summary">
        <img class="movie-poster" :src="moviePoster" alt="Poster phim" />
        <div class="movie-info">
          <h2 class="movie-title">{{ movieName }}</h2>
          <p>
            Ngày chiếu: <span>{{ showDate }}</span>
          </p>
          <p>
            Suất Chiếu: <span>{{ showtime }}</span>
          </p>
          <p>
            Ghế Ngồi:
            <span>{{
              selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "Không có ghế nào được chọn"
            }}</span>
          </p>
        </div>
      </div>

      <!-- Tổng số tiền -->
      <div class="total-amount">
        <span>Tổng Số Tiền Đặt Hàng</span>
        <span class="total-price">{{ totalPrice }} ₫</span>
      </div>

      <!-- Các nút hành động -->
      <div class="action-buttons">
        <button class="cancel-button" @click="emit('cancel')">Hủy</button>
        <button class="confirm-button" @click="emit('confirm')">Xác Nhận</button>
      </div>
    </div>
  </template>
</v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { tr } from 'vuetify/locale';
import { useRouter } from 'vue-router';

const openDialog = ref(true)

const emit = defineEmits(['cancel', 'confirm'])

// Props
const props = defineProps({
  movieName: {
    type: String,
    required: false,
    default: "Chưa có tên phim",
  },
  showtime: {
    type: String,
    required: false,
    default: "Chưa có suất chiếu",
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
  showDate: {
    type: String,
    required: false,
    default: "Chưa có ngày chiếu",
  },
  moviePoster: {
    type: String,
    required: false,
    default: "https://via.placeholder.com/150", // Đường dẫn mặc định cho poster phim
  },
});

// Computed property
const trComputed = computed(() => tr);

// Router
const router = useRouter();

// Methods
const handleCancel = () => {
  if (confirm("Bạn có chắc chắn muốn hủy đặt vé không?")) {
    router.go(-1);
  }
};

const handleConfirm = () => {
  router.push({
    path: "/payment",
    query: {
      movieName: props.movieName,
      showtime: props.showtime,
      selectedSeats: props.selectedSeats.join(","),
      totalPrice: props.totalPrice,
      showDate: props.showDate,
      moviePoster: props.moviePoster,
    },
  });
};
</script>

<style scoped lang="scss">
.confirmation-container {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 800px;
  text-align: center;
  margin: 50px auto;
  transition: all 0.3s ease-in-out;
}

.confirmation-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
}

.order-summary {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.movie-poster {
  width: 150px;
  height: auto;
  border-radius: 8px;
  margin-right: 20px;
}

.movie-info {
  flex-grow: 1;
}

.movie-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.ticket-price {
  font-size: 22px;
  font-weight: bold;
  color: #e50914;
}

.total-amount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  margin-bottom: 30px;
}

.total-price {
  color: #e50914;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

button {
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
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
