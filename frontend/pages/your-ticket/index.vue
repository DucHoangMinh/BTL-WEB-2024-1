<script setup>
import {userInforStore} from "~/stores/userInfor.js";
import {loadingStateStore} from "~/stores/loadingState.js";
import axios from "axios";
import moment from "moment-timezone";
const loadingStateStoreRef = loadingStateStore()
const userInforStoreRef = userInforStore()
import QRCode from 'qrcode'

const ticketList = ref([])
const getUserTicket = async () => {
  try {
    const { data } = await axios.get(`http://160.191.50.189:8080/admin/users/tickets/${userInforStoreRef.getUserInfor.id}`, {
      headers: {
        'Authorization': `Bearer ${userInforStoreRef.getUserInfor.token}`
      }
    })
    console.log(data)
    ticketList.value = data.tickets
  } catch (e) {
    console.log(e + "")
  } finally {

  }
}
const createQr = async (ticket) => {
  const dataCreateQR = {
    userId: userInforStoreRef.getUserInfor.token,
    ticket: ticket
  }
  const options = {
    margin: 4,
    errorCorrectionLevel: 'L',
  };
  const qrCodeURL = await QRCode.toDataURL(JSON.stringify(dataCreateQR), options)
  // Tạo một thẻ <a> ẩn
  const link = document.createElement("a");
  link.href = qrCodeURL; // Dữ liệu base64
  link.download = "8movies_qrcode.png";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
const init = async () => {
  try{
    loadingStateStoreRef.setLoadingState(true)
    await getUserTicket()
    console.log("sa")
  } catch(e) {

  } finally {
    loadingStateStoreRef.setLoadingState(false)
  }
}
onMounted(init)
</script>

<template lang="pug">
.your-ticket
  v-container
    h2 Danh sách vé của bạn
    .ticket-list-area
      .ticket-area
        .ticket-item(v-for="(ticket, index) in ticketList" :key="index")
          v-row
            v-col(cols="3").d-flex.align-center.justify-center
              img.py-4.ticket-img(src="https://png.pngtree.com/template/20211023/ourlarge/pngtree-movie-tickets-star-kraft-paper-cinema-dating-retro-orange-tickets-image_708773.png")
            v-col(cols="7").d-flex.flex-column.justify-center
              p Day la ten phim
              p Thời gian chiếu: {{ticket.Showtime.start_time}}
              p Vị trị ghế: {{ticket.Seat.row}}{{ticket.Seat.column}}
              p Ngày mua vé: {{ticket.purchase_date}}
            v-col(cols="2").d-flex.flex-column.justify-center
              p.click-qr.cursor-pointer(@click="() => createQr(ticket)") Click để lấy mã qr

</template>

<style scoped lang="sass">
.ticket-item
  border: 1px solid #001
  border-radius: 8px
  margin-bottom: 12px
.ticket-img
  width: 80%
  border-radius: 8px
</style>