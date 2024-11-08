const express = require('express');
// const router = express.Router();
const router = express.Router({ mergeParams: true });
const SeatController = require('../app/controllers/SeatController');

// Lấy danh sách tất cả ghế trong một phòng chiếu
router.get('/', SeatController.getSeatsByRoom);

// Thêm ghế vào phòng chiếu
router.post('/', SeatController.createSeats);

// Xóa một ghế (theo ID ghế trong phòng)
router.delete('/:id', SeatController.deleteSeat);

// Cập nhật thông tin một ghế (theo ID ghế trong phòng)
router.put('/:id', SeatController.updateSeat);

// Cập nhật thông tin nhiều ghế ( để sửa lại showtime id cho nhanh)
// router.put('/updateShowtime', SeatController.updateSeatsShowtime);

// Lấy danh sách ghế với trạng thái cho một phòng chiếu và suất chiếu
router.get('/showtime/:showtime_id', SeatController.getSeatsByShowtimeAndRoom);

module.exports = router;
