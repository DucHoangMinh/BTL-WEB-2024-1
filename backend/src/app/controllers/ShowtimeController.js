const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ShowtimeController {
  // Thêm một suất chiếu mới
  createShowtime = async (req, res) => {
    const { movie_id, room_id, show_date, start_time, end_time} = req.body;

    // Kiểm tra nếu thiếu trường dữ liệu
    if (!movie_id || !room_id || !show_date || !start_time || !end_time ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const newShowtime = await prisma.showtime.create({
        data: {
          movie_id: parseInt(movie_id),
          room_id: parseInt(room_id),
          show_date: new Date(show_date),
          start_time: new Date(start_time),
          end_time: new Date(end_time),
        }
      });

      return res.status(201).json(newShowtime);
    } catch (error) {
      console.error('Error creating showtime:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Lấy danh sách tất cả các suất chiếu
  getAllShowtimes = async (req, res) => {
    try {
      const showtimes = await prisma.showtime.findMany({
        include: {
          Movie: true,
          Room: true
        }
      });
      return res.status(200).json(showtimes);
    } catch (error) {
      console.error('Error fetching showtimes:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  async getShowtimesByTheaterAndMovie(req, res) {
    const { theaterId, movieId, date } = req.query;

    if (!theaterId || !movieId || !date) {
      return res.status(400).json({ message: 'theaterId, movieId, and date are required' });
    }

    try {
      const showtimes = await prisma.showtime.findMany({
        where: {
          movie_id: parseInt(movieId),
          show_date: new Date(date), // Thêm điều kiện ngày để lọc theo ngày được chọn
          Room: {
            movie_theater_id: parseInt(theaterId),
          },
        },
        select: {
          id: true,
          show_date: true,
          start_time: true,
          end_time: true,
          Room: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (showtimes.length === 0) {
        return res.status(404).json({ message: 'No showtimes found for this movie at the selected theater on the chosen date' });
      }

      return res.status(200).json({
        message: 'Danh sách suất chiếu',
        showtimes,
      });
    } catch (error) {
      console.error('Error fetching showtimes:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  getMoviesByTheaterAndTime = async (req, res) => {
    try {
      const { theater_id } = req.params; // ID rạp
      const { start_date, end_date } = req.query; // Khoảng thời gian (optional)
  
      if (!theater_id) {
        return res.status(400).json({ message: 'Theater ID is required.' });
      }
  
      // Lọc theo thời gian nếu có
      const timeFilter = {};
      if (start_date) {
        timeFilter.gte = new Date(start_date);
      }
      if (end_date) {
        timeFilter.lte = new Date(end_date);
      }
  
      // Lấy danh sách room_id từ theater_id
      const rooms = await prisma.room.findMany({
        where: { movie_theater_id: parseInt(theater_id) },
        select: { id: true },
      });
  
      if (rooms.length === 0) {
        return res.status(404).json({ message: 'No rooms found for this theater.' });
      }
  
      const roomIds = rooms.map((room) => room.id);
  
      // Lấy danh sách showtime từ room_id
      const showtimes = await prisma.showtime.findMany({
        where: {
          room_id: { in: roomIds },
          ...(Object.keys(timeFilter).length && { start_time: timeFilter }),
        },
        include: {
          Movie: { // Thông tin phim
            select: {
              id: true,
              title: true,
              genre: true,
              duration: true,
            },
          },
        },
      });
  
      if (showtimes.length === 0) {
        return res.status(404).json({ message: 'No showtimes found for this theater within the specified time range.' });
      }
  
      // Định dạng kết quả trả về
      const result = showtimes.map((showtime) => ({
        showtime_id: showtime.id,
        start_time: showtime.start_time,
        end_time: showtime.end_time,
        movie: showtime.Movie,
      }));
  
      // Trả về kết quả
      return res.status(200).json({
        message: 'Showtimes retrieved successfully.',
        result,
      });
    } catch (error) {
      console.error('Error fetching movies by theater and time:', error.message);
      return res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
  };
  assignMovieToEmptyShowtimes = async (req, res) => {
    try {
      const { movie_id, showtime_ids } = req.body;
  
      if (!movie_id || !Array.isArray(showtime_ids) || showtime_ids.length === 0) {
        return res.status(400).json({ message: 'movie_id and a non-empty array of showtime_ids are required.' });
      }
  
      // Kiểm tra phim có tồn tại không
      const movie = await prisma.movie.findUnique({
        where: { id: parseInt(movie_id) },
      });
  
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found.' });
      }
  
      // Gán phim vào danh sách lịch chiếu
      const updatedShowtimes = await Promise.all(
        showtime_ids.map((showtime_id) =>
          prisma.showtime.update({
            where: { id: parseInt(showtime_id) },
            data: { movie_id: parseInt(movie_id) },
          })
        )
      );
  
      // Trả về danh sách showtime_id đã được gán
      return res.status(200).json({
        message: 'Movie assigned to showtimes successfully.',
        updatedShowtimes: updatedShowtimes.map((showtime) => showtime.id),
      });
    } catch (error) {
      console.error('Error assigning movie to showtimes:', error.message);
      return res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
  };
}



module.exports = new ShowtimeController();
