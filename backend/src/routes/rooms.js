const express = require('express');
const router = express.Router();
const RoomController = require('../app/controllers/RoomController');

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

module.exports = router;
