const express = require('express');
const router = express.Router();
const SeatController = require('../app/controllers/SeatController');

// Lấy danh sách tất cả ghế trong một phòng chiếu
router.get('/', SeatController.getSeatsByRoom);

// Thêm ghế vào phòng chiếu
router.post('/', SeatController.createSeats);

// Xóa một ghế (theo ID ghế trong phòng)
router.delete('/:id', SeatController.deleteSeat);

// Cập nhật thông tin một ghế (theo ID ghế trong phòng)
router.put('/:id', SeatController.updateSeat);

// Lấy danh sách ghế với trạng thái cho một phòng chiếu và suất chiếu
router.get('/showtime/:showtime_id', SeatController.getSeatsByShowtimeAndRoom);

module.exports = router;
