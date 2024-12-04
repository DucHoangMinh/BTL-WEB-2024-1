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
## Lấy ra danh sách phim
## Trả về danh sách tất cả các bộ phim kèm Showtimes và feedback 
GET: http://localhost:3000/api/movies  

## Trả về bộ phim với Id tương ứng kèm Showtimes và feedback 
GET: http://localhost:3000/api/movies/:movieId  

## Trả về danh sách các thành phố có rạp chiếu bộ phim với movie_id được chọn, thuộc ngày đã chọn  

GET: http://localhost:3000/api/movies/3/cities?date=2024-11-07
```
{
    "cities": [
        {
            "city": "TP. Hồ Chí Minh"
        }
    ]
}
```
## Trả về danh sách các rạp có phim đã chọn, thuộc thành phố và ngày đã chọn  
http://localhost:3000/api/movie-theaters/available/theaters?city=<city>&movieId=<movieId>&date=<yyy-mm-dd> 
http://localhost:3000/api/movie-theaters/available/theaters?city=TP.%20Hồ%20Chí%20Minh&movieId=3&date=2024-11-07
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
## Trả về danh sách các rạp và suất chiếu tương ứng có phim đã chọn, thuộc thành phố và ngày đã chọn
http://localhost:3000/api/movie-theaters/available/theaters/showtimes?city=TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh&movieId=3&date=2024-11-07  
```
[
    {
        "id": 1,
        "name": "8Movies Nam Sài Gòn",
        "rooms": [
            {
                "id": 1,
                "name": "Rạp 1",
                "showtimes": [
                    {
                        "id": 1,
                        "show_date": "2024-11-07T00:00:00.000Z",
                        "start_time": "2024-11-07T10:00:00.000Z",
                        "end_time": "2024-11-07T12:00:00.000Z",
                        "price": 10.5
                    }
                ]
            },
            {
                "id": 2,
                "name": "Rạp 2",
                "showtimes": [
                    {
                        "id": 2,
                        "show_date": "2024-11-07T00:00:00.000Z",
                        "start_time": "2024-11-07T10:00:00.000Z",
                        "end_time": "2024-11-07T12:00:00.000Z",
                        "price": 10.5
                    }
                ]
            },
            {
                "id": 3,
                "name": "Rạp 3",
                "showtimes": [
                    {
                        "id": 3,
                        "show_date": "2024-11-07T00:00:00.000Z",
                        "start_time": "2024-11-07T10:00:00.000Z",
                        "end_time": "2024-11-07T12:00:00.000Z",
                        "price": 10.5
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "name": "8Movies Cộng Hoà",
        "rooms": [
            {
                "id": 12,
                "name": "Rạp 2",
                "showtimes": [
                    {
                        "id": 4,
                        "show_date": "2024-11-07T00:00:00.000Z",
                        "start_time": "2024-11-07T10:00:00.000Z",
                        "end_time": "2024-11-07T12:00:00.000Z",
                        "price": 10.5
                    }
                ]
            }
        ]
    }
]
```
## Trả về các suất chiếu của phim và rạp đã chọn  
http://localhost:3000/api/showtimes/available?movieId=<movieId>&theaterId=<theaterId>&date=<yyyy-mm-dd>  
http://localhost:3000/api/showtimes/available?movieId=3&theaterId=2&date=2024-11-07  
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
## Trả về các bộ phim với thành phố đã chọn, rạp đã chọn và ngày đã chọn  
http://localhost:3000/api/movies/avaiblebycity?city=<city>&theaterId=<theaterId>&selectedDate=<yyyy-mm-dd>  
http://localhost:3000/api/movies/avaiblebycity?city=TPHCM&theaterId=1&selectedDate=2024-12-16
```
[
    {
        "id": 1,
        "title": "CƯỜI XUYÊN BIÊN GIỚI",
        "genre": "2D | Normal | Normal sound | Lồng tiếng,Phụ đề",
        "duration": 113,
        "rating": 6.1,
        "release_date": "2024-11-15T00:00:00.000Z",
        "description": "Cười Xuyên Biên Giới kể về hành trình của Jin-bong (Ryu Seung-ryong) - cựu vô địch bắn cung quốc gia, sau khi nghỉ hưu, anh đã trở thành một nhân viên văn phòng bình thường. Đứng trước nguy cơ bị sa thải, Jin-bong phải nhận một nhiệm vụ bất khả thi là bay đến nửa kia của trái đất trong nỗ lực tuyệt vọng để sinh tồn. Sống sót sau một sự cố đe doạ tính mạng, Jin-bong đã “hạ cánh” xuống khu rừng Amazon, nơi anh gặp bộ ba thổ dân bản địa có kỹ năng bắn cung thượng thừa: Sika, Eeba và Walbu. Tin rằng đã tìm ra cách để tự cứu mình, Jin-bong hợp tác với phiên dịch ngáo ngơ Bbang-sik (Jin Sun-kyu) và đưa ba chiến thần cung thủ đến Hàn Quốc cho một nhiệm vụ táo bạo.",
        "thumbnail": "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202411/11623_103_100003.jpg",
        "ranking": "[Trong nước] (T13) Trên 13 tuổi"
    },
    {
        "id": 2,
        "title": "WICKED",
        "genre": "2D | Normal | Normal sound | Phụ đề",
        "duration": 160,
        "rating": 9.6,
        "release_date": "2024-11-22T00:00:00.000Z",
        "description": "Wicked, câu chuyện chưa kể về các phù thủy xứ Oz, có sự tham gia của nữ viên viên Cynthia Erivo người từng đoạt giải Emmy, Grammy và Tony trong vai Elphaba, một phù thủy trẻ với làn da xanh đặc biệt, người vẫn chưa khám phá ra sức mạnh tiềm ẩn bên trong mình và “công chúa nhạc pop” Ariana Grande trong vai Glinda, một phù thủy trẻ nổi tiếng, được tô điểm bởi đặc quyền và tham vọng, người vẫn chưa khám phá ra trái tim thực sự của mình.",
        "thumbnail": "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202411/11555_103_100003.jpg",
        "ranking": "[Trong nước] (K) Dưới 13t cần xem cùng cha/mẹ"
    }
]
```
## Trả về danh sách ghế của phòng chiếu với suất chiếu đã chọn
http://localhost:3000/api/rooms/:room_id/seats/showtime/:showtime_id
http://localhost:3000/api/rooms/1/seats/showtime/1
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

## Đặt Ghế (Book Seat)
- Endpoint: POST /api/rooms/:room_id/seats/:seat_id/book
    - Mô tả: Đặt một ghế trong phòng chỉ định ở trạng thái "on-hold" để giữ chỗ trong 10 phút.
- Tham số:
    - room_id (URL param, bắt buộc): ID của phòng chứa ghế.
    - seat_id (URL param, bắt buộc): ID của ghế muốn đặt.
    - showtime_id (URL param, bắt buộc): ID của suất chiếu mà ghế thuộc về.
- Yêu cầu Body:
    - user_id (integer, bắt buộc): ID của người dùng đặt ghế.
## Xác Nhận Thanh Toán và Tạo Vé (Confirm Payment)
- Endpoint: POST /api/rooms/:room_id/seats/:seat_id/confirm
    - Mô tả: Xác nhận thanh toán cho ghế đã đặt trong phòng chỉ định và tạo vé (Ticket) cho người dùng.
- Tham số:
    - room_id (URL param, bắt buộc): ID của phòng chứa ghế.
    - seat_id (URL param, bắt buộc): ID của ghế muốn xác nhận thanh toán.
- Yêu cầu Body:
    - user_id (integer, bắt buộc): ID của người dùng xác nhận thanh toán.
    - showtime_id (integer, bắt buộc): ID của suất chiếu để liên kết vé.
    - promotion_id (integer, tùy chọn): ID của khuyến mãi, nếu có.
## Thanh toans bằng QR:
-  Endpoint: POST /api/rooms/:room_id/seats/:seat_id/confirmQR
   -Trả về mã QR để thanh toán
- Tham số:
    - room_id (URL param, bắt buộc): ID của phòng chứa ghế.
    - seat_id (URL param, bắt buộc): ID của ghế muốn xác nhận thanh toán.
- Yêu cầu Body:
    - user_id (integer, bắt buộc): ID của người dùng xác nhận thanh toán.
    - showtime_id (integer, bắt buộc): ID của suất chiếu để liên kết vé.
    - promotion_id (integer, tùy chọn): ID của khuyến mãi, nếu có.

## Luồng đặt phim theo rạp muốn xem
  Lấy rạp theo thành phố:
  -Endpoint : GET /api/:cityName/theaters-and-movies
  -yêu cầu body: không
  Lấy phim:
  -Endpoint: Get'api/now-showing'
  -yêu cầu body: không
  Lấy thời gian theo phim:
   -Endpoint : GET './:movieId/movie-showtime',
   -yêu cầu body: không


## How to send token with request with POSTMAN
Ở trình duyệt, nhấn ctrl+shifi+i<br>
Chọn tab Application, ở sidebar bên trái, chọn local storage -> http://localhost:3000<br>
Sau khi đăng nhập, sẽ thấy token được trả về<br>
Copy giá trị của token<br>
Trong POSTMAN, tạo 1 req GET http://localhost:3000/api/movies<br>
Chọn tab Authorization, ở Auth Type chọn Bearer token -> nhập token vừa copy<br>
Send request<br>
## Tạo phim
- Endpoint: POST /api/movies/add
    - Mô tả: Thêm phim mới vào danh sách phim đã có, cho phép upload thumbnail, chưa update thêm phần related_thumbnail và trailer
    - Lưu ý: Gửi dưới dạng form-data
- Body:
    - title: Movie Title
    - genre: Action
    - duration: 120
    - rating: 8.5
    - release_date: 2024-12-02
    - description: A thrilling action movie
    - basic_info: Basic info about the movie
    - thumbnail: upload file
    - ranking: Trong nước
    - trailer: 