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
{
  "email": "thanhdong1317@gmail.com",
  "password": "123456"
}
```
