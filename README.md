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
GET: http://localhost:3000/api/movies  
Trả về danh sách tất cả các bộ phim kèm Showtimes và feedback ( tôi có thể chỉnh lại sau để chia nhỏ ra)  
GET: http://localhost:3000/api/movies/:movieId  
Trả về bộ phim với Id tương ứng kèm Showtimes và feedback ( tôi có thể chỉnh lại sau để chia nhỏ ra)  


GET: http://localhost:3000/api/movies/3/cities  
Trả về danh sách các thành phố có rạp chiếu bộ phim với movie_id được chọn
```
{
    "cities": [
        {
            "city": "TP. Hồ Chí Minh"
        }
    ]
}
```
http://localhost:3000/api/movie-theaters/available/theaters?city=<city>&movieId=<movieId>  
http://localhost:3000/api/movie-theaters/available/theaters?city=TP.%20Hồ%20Chí%20Minh&movieId=3  
Trả về danh sách các rạp có phim đã chọn, thuộc thành phố đã chọn  
```
[
    {
        "id": 1,
        "name": "8Movies Nam Sài Gòn"
    },
    {
        "id": 2,
        "name": "8Movies Cộng Hoà"
    }
]
```
http://localhost:3000/api/showtimes/available?movieId=<movieId>&theaterId=<theaterId>  
http://localhost:3000/api/showtimes/available?movieId=3&theaterId=2  
Trả về các suất chiếu của phim và rạp đã chọn  
```
[
    {
        "id": 4,
        "show_date": "2024-11-07T00:00:00.000Z",
        "start_time": "2024-11-07T10:00:00.000Z",
        "end_time": "2024-11-07T12:00:00.000Z",
        "price": 10.5,
        "Room": {
            "id": 12,
            "movie_theater_id": 2
        }
    }
]
```
http://localhost:3000/api/rooms/:room_id/seats/showtime/:showtime_id
http://localhost:3000/api/rooms/1/seats/showtime/1
Trả về danh sách ghế của phòng chiếu với suất chiếu đã chọn
```
[
    {
        "id": 2,
        "seat_number": "A2",
        "seat_type": "Regular",
        "row": "A",
        "column": 2,
        "status": "available"
    },
    {
        "id": 3,
        "seat_number": "A3",
        "seat_type": "Regular",
        "row": "A",
        "column": 3,
        "status": "available"
    },
    {
        "id": 4,
        "seat_number": "A4",
        "seat_type": "Regular",
        "row": "A",
        "column": 4,
        "status": "available"
    },
    {
        "id": 5,
        "seat_number": "A5",
        "seat_type": "Regular",
        "row": "A",
        "column": 5,
        "status": "available"
    },
  ]
```
## How to send token with request with POSTMAN
Ở trình duyệt, nhấn ctrl+shifi+i<br>
Chọn tab Application, ở sidebar bên trái, chọn local storage -> http://localhost:3000<br>
Sau khi đăng nhập, sẽ thấy token được trả về<br>
Copy giá trị của token<br>
Trong POSTMAN, tạo 1 req GET http://localhost:3000/api/movies<br>
Chọn tab Authorization, ở Auth Type chọn Bearer token -> nhập token vừa copy<br>
Send request<br>