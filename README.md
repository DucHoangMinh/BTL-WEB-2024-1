# BTL-WEB-2024-1
## How to run?
```
cd frontend
npm install
yarn install
npm run dev
```
## Json for Postman
POST: http://localhost:3000/api/register
```
{
  "firstName": "Dong",
  "lastName": "Thanh",
  "email": "thanhdong1317@gmail.com",
  "password": "123456",
  "confirmPassword": "123456",
  "dateOfBirth": "2003-11-13"
}
```
POST: http://localhost:3000/api/login
```
{
  "email": "thanhdong1317@gmail.com",
  "password": "123456"
}
```
## How to send token with request with POSTMAN
Ở trình duyệt, nhấn ctrl+shifi+i<br>
Chọn tab Application, ở sidebar bên trái, chọn local storage -> http://localhost:3000<br>
Sau khi đăng nhập, sẽ thấy token được trả về<br>
Copy giá trị của token<br>
Trong POSTMAN, tạo 1 req GET http://localhost:3000/api/movies<br>
Chọn tab Authorization, ở Auth Type chọn Bearer token -> nhập token vừa copy<br>
Send request<br>