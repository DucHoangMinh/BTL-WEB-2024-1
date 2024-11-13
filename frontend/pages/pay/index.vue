<template>
  <div class="qr-payment-container">
    <div class="order-info-container">
      <div class="order-info">
        <h2 class="order-title">Thông tin đơn hàng</h2>
        <div class="order-details">
          <div class="order-item">
            <span class="item-label">Số tiền thanh toán:</span>
            <span class="item-value highlight-value"
              >{{ totalPrice.toLocaleString() }} VND</span
            >
          </div>

          <div class="order-item">
            <span class="item-label">Giá trị đơn hàng:</span>
            <span class="item-value"
              >{{ totalPrice.toLocaleString() }} VND</span
            >
          </div>
          <div class="order-item">
            <span class="item-label">Phí giao dịch:</span>
            <span class="item-value">0 VND</span>
          </div>
          <div class="order-item">
            <span class="item-label">Mã đơn hàng:</span>
            <span class="item-value">{{ orderId }}</span>
          </div>
          <div class="order-item">
            <span class="item-label">Nhà cung cấp:</span>
            <span class="item-value">{{ supplier }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="qr-section">
      <h2>Quét mã qua ứng dụng Ngân hàng/ Ví điện tử</h2>
      <img :src="qrCodeUrl" alt="QR Code" class="qr-code" />
      <div class="countdown">
        Giao dịch hết hạn sau: <strong>{{ minutes }}:{{ seconds }}</strong>
      </div>
      <button @click="handleCancel" class="cancel-payment-button">
        Hủy thanh toán
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "QrPaymentPage",
  data() {
    return {
      totalPrice: 65000, // Giá trị đơn hàng
      orderId: "54494896", // Mã đơn hàng
      supplier: "CÔNG TY TNHH LOTTECINEMA VIỆT NAM", // Nhà cung cấp
      qrCodeUrl: "https://via.placeholder.com/150", // Đường dẫn giả định cho QR Code (sẽ cần thay bằng URL thật)
      countdown: 600, // 10 phút (600 giây)
    };
  },
  computed: {
    minutes() {
      return Math.floor(this.countdown / 60)
        .toString()
        .padStart(2, "0");
    },
    seconds() {
      return (this.countdown % 60).toString().padStart(2, "0");
    },
  },
  methods: {
    handleCancel() {
      // Xử lý khi người dùng nhấn "Hủy thanh toán"
      if (window.confirm("Bạn có chắc chắn muốn hủy thanh toán không?")) {
        alert("Thanh toán đã được hủy.");
        this.$router.push("/"); // Điều hướng về trang chủ sau khi hủy thanh toán
      }
    },
  },
  mounted() {
    // Đếm ngược thời gian
    this.timer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.timer);
        alert("Giao dịch đã hết hạn! Vui lòng thực hiện lại thanh toán.");
        this.$router.push("/"); // Điều hướng về trang chủ khi hết thời gian
      }
    }, 1000);
  },
  beforeDestroy() {
    // Xóa bộ đếm giờ khi component bị hủy
    clearInterval(this.timer);
  },
};
</script>

<style scoped lang="scss">
.qr-payment-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 900px;
  margin: 40px auto;
}

.order-info-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.order-info {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}

.order-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #000;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.order-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order-item {
  display: flex;
  flex-direction: column; 
}

.item-label {
  font-size: 14px;
  font-weight: normal;
  color: #666;
  margin-bottom: 4px; 
}

.item-value {
  font-size: 14px;
  font-weight: bold;
  color: #000000;
}

.highlight-value {
  font-size: 18px; 
  color: #e50914; 
}

.qr-section {
  flex: 1;
  text-align: center;
}

.qr-code {
  width: 150px;
  height: 150px;
  margin: 20px 0;
}

.countdown {
  font-size: 16px;
  font-weight: bold;
  color: #e50914;
  margin-bottom: 20px;
}

.cancel-payment-button {
  padding: 10px 20px;
  background-color: #e50914;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.cancel-payment-button:hover {
  background-color: #d40813;
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
</style>
