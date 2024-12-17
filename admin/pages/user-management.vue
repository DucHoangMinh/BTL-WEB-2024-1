<template>
  <div class="admin-user-list">
    <!-- Tiêu đề -->
    <h1 class="title">Danh Sách Người Dùng Hệ Thống</h1>

    <!-- Ô tìm kiếm -->
    <div class="search-container">
      <!-- <h3 class="search-title">Tìm Kiếm Người Dùng</h3> -->
      <div class="search-box">
        <input
          v-model="searchQuery"
          @input="filterUsers"
          placeholder="Tìm kiếm người dùng..."
          class="search-input"
        />
      </div>
    </div>

    <!-- Bảng danh sách người dùng -->
    <table class="user-table">
      <thead>
        <tr>
          <th>Họ Tên</th>
          <th>Email</th>
          <th>Ngày Sinh</th>
          <th>Danh sách Vé</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.full_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ formatDate(user.created_at) }}</td>
          <td>
            <button @click="showTickets(user.id)">
              <i class="eye-icon">👁️</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Dialog hiển thị danh sách vé -->
    <div v-if="isDialogVisible" class="dialog-overlay" @click="isDialogVisible = false">
      <div class="dialog-box">
        <h2 class="dialog-title">Danh Sách Vé</h2>
        <div v-for="ticket in selectedTickets" :key="ticket.id" class="ticket-card">
          <!-- Ảnh vé -->
          <div class="ticket-image-container">
            <img
              src="https://www.daviesmediadesign.com/wp-content/uploads/2018/03/Spacetime-GIMP-Movie-Poster-Astronaut-Version-850.jpg"
              alt="Movie Poster"
              class="ticket-image"
            />
          </div>
          <div class="ticket-details">
            <p><strong>Tên Phim:</strong> Phim id {{ ticket.Showtime.movie_id }}</p>
            <p><strong>Thời Gian Chiếu:</strong> {{ formatDate(ticket.Showtime.start_time) }}</p>
            <p><strong>Vị Trí Ghế:</strong> {{ ticket.Seat.row + ticket.Seat.column }}</p>
            <p><strong>Ngày Mua Vé:</strong> {{ formatDate(ticket.purchase_date) }}</p>
          </div>
        </div>
        <button @click="closeDialog" class="close-button">Đóng</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
// import { useStore } from "vuex";
// const store = useStore();
const searchQuery = ref("");
const users = ref();
const filteredUsers = ref([]);
const isDialogVisible = ref(false);
const selectedTickets = ref([]);

const filterUsers = () => {
  const query = searchQuery.value.toLowerCase();
  filteredUsers.value = users.value.filter(
      (user) =>
          user.full_name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
  );
};
const getUserList = async () => {
  try {
    const {data} = await axios.get("https://api-btl-web-2024-1.vercel.app/admin/users", {
      headers: {
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJlbWFpbCI6ImFkbWluMDFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM0NDQ1NjUwLCJleHAiOjE3MzQ1MzIwNTB9.ud_8Ly6vmnuLtfn7R1_EYFHcuF8LxGsGplnh1INnESE`
      },
    });
    users.value = data.users;
  } catch (e) {
    console.log(e)
  } finally {

  }
}
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và format 2 chữ số
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getFullYear(); // Lấy năm
  return `${day}-${month}-${year}`;
};

const showTickets = async (tickets) => {
  try {
    const {data} = await axios.get("https://api-btl-web-2024-1.vercel.app/admin/users/tickets/" + tickets)
    selectedTickets.value = data.tickets;
    isDialogVisible.value = true;
  } catch (e) {
    console.log(e)
  }
  // selectedTickets.value = tickets;
  // isDialogVisible.value = true;
};

const closeDialog = () => {
  isDialogVisible.value = false;
  selectedTickets.value = [];
};
const init = async () => {
  document.body.classList.add('white-content');
  await getUserList()
  filteredUsers.value = users.value;
}
onMounted(init);
</script>

<style scoped>
.admin-user-list {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.search-box {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.user-table th {
  background-color: #f4f4f4;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Làm tối nền */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.dialog-box {
  position: fixed; /* Giữ dialog cố định ở giữa */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Căn giữa */
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px; /* Chiều rộng cố định */
  max-height: 80vh; /* Chiều cao tối đa */
  overflow-y: auto; /* Hiển thị thanh cuộn nếu nội dung quá dài */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Thêm bóng */
  z-index: 1000; /* Đảm bảo dialog nằm trên tất cả các phần khác */
}

.dialog-title {
  font-size: 20px;
  margin-bottom: 15px;
  text-align: center;
}

.ticket-card {
  display: flex; /* Sắp xếp ảnh và thông tin vé nằm ngang */
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
}

.ticket-image-container {
  margin-right: 15px;
}

.ticket-image {
  width: 80px; /* Giới hạn kích thước ảnh */
  height: auto;
  border-radius: 4px;
}

.ticket-details p {
  margin: 5px 0;
  font-size: 14px;
}

.close-button {
  display: block;
  width: 100%;
  background-color: #000000;
  color: #fff;
  text-align: center;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.close-button:hover {
  background-color: #000000;
}

</style>
