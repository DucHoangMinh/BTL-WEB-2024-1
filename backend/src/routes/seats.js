const express = require('express');
const router = express.Router();
const SeatController = require('../app/controllers/SeatController');

// Lấy danh sách tất cả ghế trong phòng chiếu
router.get('/:room_id/seats', SeatController.getSeatsByRoom);

// Thêm ghế vào phòng chiếu
router.post('/:room_id/seats', SeatController.createSeats);

// Xóa một ghế
router.delete('/seats/:id', SeatController.deleteSeat);

// Cập nhật thông tin một ghế
router.put('/seats/:id', SeatController.updateSeat);

module.exports = router;
