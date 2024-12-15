<script setup>
import { ref } from "vue";
import showMessages from "~/utils/toast.js";
import axios from "axios";
import {userInforStore} from "~/stores/userInfor.js";
import {loadingStateStore} from "~/stores/loadingState.js";
const loadingStateStoreRef = loadingStateStore()
const isEditable = ref(false);
const userInforStoreRef = userInforStore()

const userData = ref({
  firstName: "",
  lastName: "",
  email: "",
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
  dateOfBirth: ""
});

const isChangingPassword = ref(false);
const getUserInfor = async () => {
  try {
    loadingStateStoreRef.setLoadingState(true)
    const {data} = await axios.get("http://160.191.50.189:8080/user", {
      headers: {
        'Authorization': `Bearer ${userInforStoreRef.getUserInfor.token}`
      }
    });
    userData.value.firstName = data.user.full_name
    userData.value.lastName = data.user.full_name
    userData.value.email = data.user.email
    userData.value.dateOfBirth = formatDate(data.user.date_of_birth)
  } catch (error) {
    console.log(error)
    showMessages.error("Có lỗi xảy ra khi lấy thông tin người dùng")
  } finally {
    loadingStateStoreRef.setLoadingState(false)
  }
}
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần +1
  const day = String(date.getDate()).padStart(2, '0'); // Đảm bảo ngày có 2 chữ số

  return `${year}-${month}-${day}`;
};
const toggleEdit = async () => {
  if(isEditable.value){
    if(isChangingPassword.value){
      try {
        loadingStateStoreRef.setLoadingState(true)
        const {data} = await axios.put("https://api-btl-web-2024-1.vercel.app/user/change-password", {
          currentPassword: userData.value.currentPassword,
          newPassword: userData.value.newPassword,
          confirmPassword: userData.value.confirmNewPassword
        }, {
          headers: {
            'Authorization': `Bearer ${userInforStoreRef.getUserInfor.token}`
          }
        });
        showMessages.success("Thay đổi mật khẩu thành công!!!")
        userData.value = {
          firstName: "",
          lastName: "",
          email: "",
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
          dateOfBirth: ""
        }
      } catch (e) {
        showMessages.error(e.response.data.message)
      } finally {
        loadingStateStoreRef.setLoadingState(false)
      }
    } else {
      try {
        loadingStateStoreRef.setLoadingState(true)
        const {data} = await axios.put("https://api-btl-web-2024-1.vercel.app/user", {
          email: userData.value.email,
          phone_number: null,
          full_name: userData.value.firstName + userData.value.lastName,
          date_of_birth: userData.value.dateOfBirth
        }, {
          headers: {
            'Authorization': `Bearer ${userInforStoreRef.getUserInfor.token}`
          }
        });
        showMessages.success("Thay đổi thong tin thành công!!!")
        userData.value = {
          firstName: "",
          lastName: "",
          email: "",
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
          dateOfBirth: ""
        }
      } catch (e) {
        showMessages.error(e.response.data.message)
      } finally {
        loadingStateStoreRef.setLoadingState(false)
      }
    }
  }
  isEditable.value = !isEditable.value;
};

const saveChanges = () => {
  // Kiểm tra mật khẩu hiện tại
  if (userData.value.currentPassword !== existingPassword) {
    alert("Mật khẩu hiện tại không đúng!");
    return;
  }

  if (isChangingPassword.value) {
    if (userData.value.newPassword === "") {
      showMessages.warning("Vui lòng nhập mật khẩu mới!");
      return;
    }
    if (userData.value.newPassword !== userData.value.confirmNewPassword) {
      showMessages.error("Mật khẩu mới và xác nhận không khớp!");
      return;
    }
  }
  showMessages.success("Thông tin đã được cập nhật!");
  isEditable.value = false;
  isChangingPassword.value = false;
};
const init = async () => {
  await getUserInfor()
}
onMounted(init)
</script>

<template lang="pug">
.edit-profile.my-8
  h2.title(v-if="false")  Thông Tin Cá Nhân
  form(@submit.prevent='saveChanges')
    .form-group(v-if="!isChangingPassword")
      label H&#x1ECD;
      input(type='text' v-model='userData.firstName' :disabled='!isEditable')
    .form-group(v-if="!isChangingPassword")
      label T&ecirc;n
      input(type='text' v-model='userData.lastName' :disabled='!isEditable')
    .form-group(v-if="!isChangingPassword")
      label Email
      input(type='email' v-model='userData.email' :disabled='!isEditable')
    .form-group(v-if="!isChangingPassword")
      label Ngày sinh
      input(type='date' v-model='userData.dateOfBirth' :disabled='!isEditable')

    .form-group.custom-checkbox-group
      label Đổi mật khẩu
      input(type='checkbox' v-model='isChangingPassword')
    .form-group(v-if="isChangingPassword")
      label Mật khẩu hiện tại
      input(type='password' v-model='userData.currentPassword' :disabled='!isEditable')
    .form-group(v-if='isChangingPassword')
      label Mật khẩu mới
      input(type='password' v-model='userData.newPassword' :disabled='!isEditable')
    .form-group(v-if='isChangingPassword')
      label Nhập lại mật khẩu
      input(type='password' v-model='userData.confirmNewPassword' :disabled='!isEditable')
    button.btn(type='button' @click='toggleEdit')
      | {{ isEditable ? "Xác nhận" : "Sửa" }}
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
