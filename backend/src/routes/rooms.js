const express = require('express');
const router = express.Router();
const RoomController = require('../app/controllers/RoomController');
const seatRouter = require('./seats');

// lấy danh sách tất cả các phòng chiếu
router.get('/', RoomController.getAllRooms);

// lấy thông tin chi tiết của một phòng chiếu dựa trên ID
router.get('/:id', RoomController.getRoomById);

// tạo một phòng chiếu mới
router.post('/', RoomController.createRoom);

// cập nhật thông tin của một phòng chiếu
router.put('/:id', RoomController.updateRoom);

// xóa một phòng chiếu dựa trên ID
router.delete('/:id', RoomController.deleteRoom);

// Tích hợp route con cho seats dưới rooms
router.use('/:room_id/seats', seatRouter);

module.exports = router;
