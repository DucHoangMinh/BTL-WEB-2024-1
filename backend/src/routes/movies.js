const express = require('express');
const movieController = require('../app/controllers/MovieController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/add',upload, movieController.createMovie2);

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

//Lấy thông tin thành phố có chiếu phim theo ID
router.get('/:movieId/cities', movieController.getCitiesByMovieId);

router.get('/:movieId/date', movieController.getMoviesByDate)


module.exports = router;
