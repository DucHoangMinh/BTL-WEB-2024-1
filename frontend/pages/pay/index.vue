<template>
  <div class="qr-payment-container">
    <div class="order-info">
      <h2>Thông tin đơn hàng</h2>
      <p>Số tiền thanh toán: <strong>{{ totalPrice }} VND</strong></p>
      <p>Giá trị đơn hàng: <strong>{{ totalPrice }} VND</strong></p>
      <p>Phí giao dịch: <strong>0 VND</strong></p>
      <p>Mã đơn hàng: <strong>{{ orderId }}</strong></p>
      <p>Nhà cung cấp: <strong>{{ supplier }}</strong></p>
    </div>

    <div class="qr-section">
      <h2>Quét mã qua ứng dụng Ngân hàng/ Ví điện tử</h2>
      <img :src="qrCodeUrl" alt="QR Code" class="qr-code" />
      <div class="countdown">Giao dịch hết hạn sau: <strong>{{ minutes }}:{{ seconds }}</strong></div>
      <button @click="handleCancel" class="cancel-payment-button">Hủy thanh toán</button>
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
      supplier: "CÔNG TY TNHH 8MOVIES VIỆT NAM", // Nhà cung cấp
      qrCodeUrl: "https://via.placeholder.com/150", // Đường dẫn giả định cho QR Code (sẽ cần thay bằng URL thật)
      countdown: 600, // 10 phút (600 giây)
    };
  },
  computed: {
    minutes() {
      return Math.floor(this.countdown / 60).toString().padStart(2, "0");
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
        alert("Giao dịch đã hết hạn!");
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

.order-info {
  flex: 1;
  padding-right: 20px;
}

.qr-section {
  flex: 1;
  text-align: center;
}

.qr-code {
  width: 200px;
  height: 200px;
  margin: 20px 0;
}

.countdown {
  font-size: 20px;
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
}

.cancel-payment-button:hover {
  background-color: #d40813;
  transform: scale(1.05);
}
</style>
