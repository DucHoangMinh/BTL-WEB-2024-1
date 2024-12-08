<script setup>
import { ref } from "vue";

// Dữ liệu thông tin người dùng
const isEditable = ref(false);

const userData = ref({
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  currentPassword: "", // Dùng để xác nhận mật khẩu hiện tại
  newPassword: "", // Mật khẩu mới
  confirmNewPassword: "", // Xác nhận mật khẩu mới
  dateOfBirth: "2000-01-01",
});

const isChangingPassword = ref(false); // Trạng thái chọn đổi mật khẩu

// Mật khẩu hiện tại giả lập
const existingPassword = "123456"; // Thay bằng cách lấy từ backend khi tích hợp

// Hàm bật/tắt chế độ chỉnh sửa
const toggleEdit = () => {
  isEditable.value = !isEditable.value;
};

// Hàm lưu thay đổi
const saveChanges = () => {
  // Kiểm tra mật khẩu hiện tại
  if (userData.value.currentPassword !== existingPassword) {
    alert("Mật khẩu hiện tại không đúng!");
    return;
  }

  // Nếu chọn đổi mật khẩu, kiểm tra mật khẩu mới
  if (isChangingPassword.value) {
    if (userData.value.newPassword === "") {
      alert("Vui lòng nhập mật khẩu mới!");
      return;
    }
    if (userData.value.newPassword !== userData.value.confirmNewPassword) {
      alert("Mật khẩu mới và xác nhận không khớp!");
      return;
    }
  }

  alert("Thông tin đã được cập nhật!");
  isEditable.value = false; // Vô hiệu hóa chỉnh sửa sau khi cập nhật thành công
  isChangingPassword.value = false; // Ẩn phần đổi mật khẩu
};
</script>

<template>
  <div class="edit-profile">
    <h2 class="title"> Thông Tin Cá Nhân</h2>
    <form @submit.prevent="saveChanges">
      <div class="form-group">
        <label>Họ</label>
        <input
          type="text"
          v-model="userData.firstName"
          :disabled="!isEditable"
        />
      </div>
      <div class="form-group">
        <label>Tên</label>
        <input
          type="text"
          v-model="userData.lastName"
          :disabled="!isEditable"
        />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="userData.email" :disabled="!isEditable" />
      </div>
      <div class="form-group">
        <label>Ngày Sinh</label>
        <input
          type="date"
          v-model="userData.dateOfBirth"
          :disabled="!isEditable"
        />
      </div>
      <div class="form-group">
        <label>Mật Khẩu Hiện Tại</label>
        <input
          type="password"
          v-model="userData.currentPassword"
          :disabled="!isEditable"
        />
      </div>

      <!-- Thêm checkbox để chọn đổi mật khẩu -->
      <!-- <div class="form-group">
        <input type="checkbox" v-model="isChangingPassword" :disabled="!isEditable" />
        <label>Tôi muốn thay đổi mật khẩu</label>
      </div> -->
      <div class="form-group custom-checkbox-group">
        <label>Tôi muốn thay đổi mật khẩu</label>
        <input
          type="checkbox"
          v-model="isChangingPassword"
          :disabled="!isEditable"
        />
        
      </div>
      

      <!-- Hiển thị trường nhập mật khẩu mới nếu chọn đổi mật khẩu -->
      <div v-if="isChangingPassword" class="form-group">
        <label>Mật Khẩu Mới</label>
        <input
          type="password"
          v-model="userData.newPassword"
          :disabled="!isEditable"
        />
      </div>
      <div v-if="isChangingPassword" class="form-group">
        <label>Nhập Lại Mật Khẩu Mới</label>
        <input
          type="password"
          v-model="userData.confirmNewPassword"
          :disabled="!isEditable"
        />
      </div>

      <button type="button" @click="toggleEdit" class="btn">
        {{ isEditable ? "Xác nhận" : "Sửa" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.edit-profile {
  max-width: 600px;
  margin: auto;
  padding: 1.5em;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.title {
  text-align: center;
  margin-bottom: 1em;
  font-size: 1.5rem;
}
.form-group {
  margin-bottom: 1em;
}
.form-group label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}
.form-group input[type="checkbox"] {
  margin-right: 0.5em;
}
.form-group input {
  width: 100%;
  padding: 0.8em;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}
.custom-checkbox-group {
  display: flex; /* Căn chỉnh theo dòng */
  align-items: center; /* Căn giữa theo chiều dọc */
  column-gap: 0.5em; /* Tạo khoảng cách giữa checkbox và nhãn */
  margin-top: 1em; /* Tạo khoảng cách phía trên (nếu cần) */
}

.custom-checkbox-group input[type="checkbox"] {
  width: auto; /* Đảm bảo checkbox không bị co giãn */
  height: auto; /* Đảm bảo kích thước chuẩn */
  margin: 0; /* Loại bỏ khoảng cách mặc định */
}

.custom-checkbox-group label {
  margin: 0; /* Loại bỏ khoảng cách mặc định */
  font-weight: normal; /* Tùy chỉnh kiểu chữ nếu cần */
  cursor: pointer; /* Thêm hiệu ứng con trỏ */
}


.btn {
  display: block;
  width: 100%;
  padding: 0.8em;
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
.btn:hover {
  background-color: #000000;
}
</style>
