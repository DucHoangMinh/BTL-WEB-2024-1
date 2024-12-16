<template>
  <div class="admin-user-list">
    <!-- Tiêu đề -->
    <h1 class="title">Danh Sách Người Dùng Hệ Thống</h1>

    <!-- Ô tìm kiếm -->
    <div class="search-box">
      <input
        v-model="searchQuery"
        @input="filterUsers"
        placeholder="Tìm kiếm người dùng..."
        class="search-input"
      />
    </div>

    <!-- Bảng danh sách người dùng -->
    <table class="user-table">
      <thead>
        <tr>
          <th>Họ Tên</th>
          <th>Email</th>
          <th>Ngày Sinh</th>
          <th>Chi Tiết Vé</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.dob }}</td>
          <td>
            <button @click="showTickets(user.tickets)">
              <i class="eye-icon">👁️</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Dialog hiển thị danh sách vé -->
    <div v-if="isDialogVisible" class="dialog-overlay">
      <div class="dialog-box">
        <h2>Danh Sách Vé</h2>
        <div v-for="ticket in selectedTickets" :key="ticket.id" class="ticket-card">
          <img src="/path-to-ticket-image.png" alt="ticket" class="ticket-image" />
          <div class="ticket-details">
            <p><strong>Tên Phim:</strong> {{ ticket.movieName }}</p>
            <p><strong>Thời Gian Chiếu:</strong> {{ ticket.showTime }}</p>
            <p><strong>Vị Trí Ghế:</strong> {{ ticket.seat }}</p>
            <p><strong>Ngày Mua Vé:</strong> {{ ticket.purchaseDate }}</p>
          </div>
        </div>
        <button @click="closeDialog" class="close-button">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      users: [
        // Dữ liệu giả lập người dùng
        {
          id: 1,
          name: "Nguyễn Văn A",
          email: "a@gmail.com",
          dob: "1995-01-01",
          tickets: [
            {
              id: 101,
              movieName: "Dậy là tên phim",
              showTime: "2024-12-02T10:00:00.000Z",
              seat: "A2",
              purchaseDate: "2024-12-10T04:43:27.246Z",
            },
          ],
        },
        // Thêm nhiều user và ticket ở đây
      ],
      filteredUsers: [],
      isDialogVisible: false,
      selectedTickets: [],
    };
  },
  created() {
    this.filteredUsers = this.users;
  },
  methods: {
    // Lọc người dùng theo tên hoặc email
    filterUsers() {
      const query = this.searchQuery.toLowerCase();
      this.filteredUsers = this.users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    },
    // Hiển thị vé
    showTickets(tickets) {
      this.selectedTickets = tickets;
      this.isDialogVisible = true;
    },
    // Đóng dialog
    closeDialog() {
      this.isDialogVisible = false;
      this.selectedTickets = [];
    },
  },
};
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
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
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
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-box {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  max-height: 80%;
  overflow-y: auto;
}

.ticket-card {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.ticket-image {
  width: 100px;
  margin-right: 20px;
}

.ticket-details p {
  margin: 5px 0;
}

.close-button {
  background-color: #f44;
  color: #fff;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}
</style>
