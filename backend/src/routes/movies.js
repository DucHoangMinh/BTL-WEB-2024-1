const express = require('express');
const movieController = require('../app/controllers/MovieController');

const router = express.Router();

// Lấy toàn bộ danh sách phim
router.get('/', movieController.getAllMovies); 

// Lấy danh sách phim đang chiếu
router.get('/now-showing', movieController.getNowShowingMovies);

// Lấy danh sách phim sắp chiếu
router.get('/upcoming', movieController.getUpcomingMovies);

// Tạo phim mới
router.post('/', movieController.createMovie);

// Lấy thông tin phim theo ID
router.get('/:id', movieController.getMovieById);

// Cập nhật phim theo ID
router.put('/:id', movieController.updateMovie);

// Xóa phim theo ID
router.delete('/:id', movieController.deleteMovie);

module.exports = router;
