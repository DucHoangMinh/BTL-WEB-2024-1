const express = require('express');
const router = express.Router();
const ShowtimeController = require('../app/controllers/ShowtimeController');


// Route để thêm một suất chiếu mới
router.post('/', ShowtimeController.createShowtime);

// Route để lấy danh sách tất cả các suất chiếu
router.get('/', ShowtimeController.getAllShowtimes);

// API tìm kiếm suất chiếu theo rạp và phim (luồng đặt vé)
router.get('/available', ShowtimeController.getShowtimesByTheaterAndMovie);


module.exports = router;
