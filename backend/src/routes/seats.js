const express = require('express');
// const router = express.Router();
const router = express.Router({ mergeParams: true });
const authenticateToken = require('../middleware/prismaAuthMiddleware');  

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

// Đặt ghế
router.post('/:seat_ids/book/:showtime_id',authenticateToken, SeatController.bookSeat);

// Xác nhận thanh toán cho ghế
router.post('/payments/:room_id', SeatController.confirmPayment);

router.post('/confirm-payment', SeatController.confirmPaymentByQRCode);

module.exports = router;
