<template>
  <div class="qr-payment-container">
    <div class="order-info-container">
      <div class="order-info">
        <h2 class="order-title">Thông tin đơn hàng</h2>
        <div class="order-details">
          <div class="order-item">
            <span class="item-label">Số tiền thanh toán:</span>
            <span class="item-value highlight-value"
              >{{ qrPaymentData.totalAmount.toLocaleString() }} VND</span
            >
          </div>

          <div class="order-item">
            <span class="item-label">Giá trị đơn hàng:</span>
            <span class="item-value"
              >{{ qrPaymentData.totalAmount.toLocaleString() }} VND</span
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
      <img :src="qrPaymentData?.qrUrl" alt="QR Code" class="qr-code" />
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
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import showMessages from "~/utils/toast.js";
import axios from "axios";
import {userInforStore} from "~/stores/userInfor.js";
import {da} from "vuetify/locale";
import {loadingStateStore} from "~/stores/loadingState.js";
export default {
  name: "QrPaymentPage",
  setup() {
    const loadingStateStoreRef = loadingStateStore()
    const router = useRouter();
    const userInforStoreRef = userInforStore()
    const route = useRoute()
    const checkCounter = ref(0);
    const qrPaymentData = ref({
      qrUrl: "",
      totalAmount: ""
    })
    // Reactive state
    const totalPrice = ref(65000);
    const seatIds = ref([])
    const orderId = ref("54494896");
    const supplier = ref("CÔNG TY TNHH 8MOVIES VIẬT NAM");
    const qrCodeUrl = ref("https://via.placeholder.com/150");
    const countdown = ref(600);

    let timer = null;

    // Computed properties
    const minutes = computed(() =>
        Math.floor(countdown.value / 60)
            .toString()
            .padStart(2, "0")
    );

    const seconds = computed(() =>
        (countdown.value % 60)
            .toString()
            .padStart(2, "0")
    );

    // Methods
    const handleCancel = () => {
      if (window.confirm("Bạn có chắc chắn muốn hủy thanh toán không?")) {
        alert("Thanh toán đã được hủy.");
        router.push("/");
      }
    };
    const getQRPaymentInfor = async () => {
      try {
        loadingStateStoreRef.setLoadingState(true)
        const payload = {
          seat_ids: route.query["seat_id"].split(",").map(Number),
          user_id: userInforStoreRef.getUserInfor.id,
          room_id: route.query["room"],
          showtime_id: route.query["showtime"]
        }
        const { data } = await axios.post("http://160.191.50.189:8080/seat/confirm-payment", payload)
        console.log(data)
        qrPaymentData.value = data
      } catch (e) {
        console.log(e)
      } finally {
        loadingStateStoreRef.setLoadingState(false)
      }
    }
    const confirmPaymentSeat = async () => {
      try {
        const {data} = await axios.post(`https://api-btl-web-2024-1.vercel.app/seat/${route.query["room"]}/seats/${route.query["seat_id"]}/confirm`)
      } catch (e) {
        console.log(e)
      } finally {

      }
    }
    // Lifecycle hooks
    // onMounted(() => {
    //   timer = setInterval(() => {
    //     if (countdown.value > 0) {
    //       countdown.value--;
    //     } else {
    //       clearInterval(timer);
    //       showMessages.error("Giao dịch đã hết hạn! Vui lòng thực hiện lại thanh toán.");
    //       router.push("/");
    //     }
    //   }, 1000);
    // });
    const checkPaymentSuccess = async () => {
      try {
        const { data } = await axios.post("https://api-btl-web-2024-1.vercel.app/transaction/check-description", {
          description: "PAYMENTSEATS" + route.query["seat_id"].split(",").map(Number)
        })
        if(data.exists){
          await confirmPaymentSeat()
          showMessages.success("Thanh toán thành công! Bạn có thể xem mã qr tại trang vé của bạn")
          setTimeout(() => {
            clearInterval(timer);
            router.push("/")
          }, 3000)
        }
      } catch (e) {
        console.log(e)
      } finally {

      }
    }
    const init = async () => {
      await getQRPaymentInfor()
      timer = setInterval(async () => {
        if (countdown.value > 0) {
          countdown.value--;
          checkCounter.value = checkCounter.value + 1

          if(checkCounter.value == 15){
            await checkPaymentSuccess()
            checkCounter.value = 0
          }

        } else {
          clearInterval(timer);
          showMessages.error("Giao dịch đã hết hạn! Vui lòng thực hiện lại thanh toán.");
          router.push("/");
        }
      }, 1000);
    }
    onMounted(init)
    onBeforeUnmount(() => {
      clearInterval(timer);
    });

    return {
      totalPrice,
      orderId,
      supplier,
      qrCodeUrl,
      countdown,
      minutes,
      seconds,
      handleCancel,
      qrPaymentData
    };
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
  width: 250px;
  height: 250px;
  margin: 20px 0;
}

.countdown {
  font-size: 24px;
  font-weight: bold;
  color: #e50914;
  margin-bottom: 20px;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
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
