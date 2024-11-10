const express = require('express');
const movieTheaterController = require('../app/controllers/MovieTheaterController');

const router = express.Router();

//Lấy danh sách tất cả các rạp chiếu phim
router.get('/', movieTheaterController.getAllMovieTheaters);

//Lấy thông tin chi tiết của một rạp chiếu phim theo ID
router.get('/:id', movieTheaterController.getMovieTheaterById);

//Tạo một rạp chiếu phim mới
router.post('/', movieTheaterController.createMovieTheater);

//Cập nhật thông tin của một rạp chiếu phim theo ID
router.put('/:id', movieTheaterController.updateMovieTheater);

//Xóa một rạp chiếu phim theo ID
router.delete('/:id', movieTheaterController.deleteMovieTheater);

// Lấy danh sách các rạp chiếu trong một thành phố có chiếu phim
router.get('/available/theaters', movieTheaterController.getTheatersByCityAndMovie);

router.get('/theaters/date', movieTheaterController.getMovieTheatersByDate);

module.exports = router;
