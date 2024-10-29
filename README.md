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
POST: http://localhost:3000/api/movies
```
{
  "title": "TEE YOD: QUỶ ĂN TẠNG PHẦN 2",
  "genre": "2D | Normal | Normal sound | Phụ đề",
  "duration": 111,
  "rating": 9.4,
  "release_date": "2024-10-24T00:00:00.000Z",
  "description": "Ba năm sau cái chết của Yam, Yak vẫn tiếp tục săn lùng linh hồn bí ẩn mặc áo choàng đen. Gặp một cô gái có triệu chứng giống Yam, Yak phát hiện ra người bảo vệ linh hồn, pháp sư ẩn dật Puang, sống trong một khu rừng đầy nguy hiểm. Giữa những phép thuật ma quỷ và những sinh vật nguy hiểm. Khi họ đuổi theo linh hồn mặc áo choàng đen, tiếng kêu đầy ám ảnh của Tee Yod sắp quay trở lại một lần nữa...",
  "ranikng":"[Trong nước] (T18) Trên 18 tuổi",
  "basic_info": "Thriller/Criminal/Horror Thailand",
  "thumbnail": "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202410/11567_103_100008.jpg",
  "trailer": "https://media.lottecinemavn.com/Media/MovieFile/MovieMedia/202409/11567_301_100001.mp4",
  "relatedThumbnail": [
    "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202410/11567_105_100006.jpg",
    "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202410/11567_105_100007.png",
    "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202410/11567_105_100008.jpg"

  ]
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