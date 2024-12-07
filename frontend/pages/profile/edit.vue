<script setup>
import { ref } from 'vue';

// Dữ liệu thông tin người dùng
const isEditable = ref(false);

const userData = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  password: '',
  confirmPassword: '',
  dateOfBirth: '2000-01-01',
});

// Hàm bật/tắt chế độ chỉnh sửa
const toggleEdit = () => {
  isEditable.value = !isEditable.value;
};

// Hàm lưu thay đổi
const saveChanges = () => {
  if (userData.value.password !== userData.value.confirmPassword) {
    alert('Password và Confirm Password không trùng khớp!');
    return;
  }
  alert('Thông tin đã được cập nhật!');
  isEditable.value = false;
};
</script>

<template>
  <div class="edit-profile">
    <h2 class="title">Edit Profile</h2>
    <form @submit.prevent="saveChanges">
      <div class="form-group">
        <label>First Name</label>
        <input type="text" v-model="userData.firstName" :disabled="!isEditable" />
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input type="text" v-model="userData.lastName" :disabled="!isEditable" />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="userData.email" :disabled="!isEditable" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="userData.password" :disabled="!isEditable" />
      </div>
      <div class="form-group">
        <label>Confirm Password</label>
        <input type="password" v-model="userData.confirmPassword" :disabled="!isEditable" />
      </div>
      <div class="form-group">
        <label>Date of Birth</label>
        <input type="date" v-model="userData.dateOfBirth" :disabled="!isEditable" />
      </div>
      <button type="button" @click="toggleEdit" class="btn">
        {{ isEditable ? 'Gửi' : 'Sửa' }}
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
.form-group input {
  width: 100%;
  padding: 0.8em;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}
.btn {
  display: block;
  width: 100%;
  padding: 0.8em;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
.btn:hover {
  background-color: #0056b3;
}
</style>
