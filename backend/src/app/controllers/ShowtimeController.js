const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ShowtimeController {
  // Thêm một suất chiếu mới
  createShowtime = async (req, res) => {
    const { movie_id, room_id, show_date, start_time, end_time, price } = req.body;

    // Kiểm tra nếu thiếu trường dữ liệu
    if (!movie_id || !room_id || !show_date || !start_time || !end_time || !price) {
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
          price: parseFloat(price)
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
    const { theaterId, movieId } = req.query;
  
    if (!theaterId || !movieId) {
      return res.status(400).json({ message: 'theaterId and movieId are required' });
    }
  
    try {
      const showtimes = await prisma.showtime.findMany({
        where: {
          movie_id: parseInt(movieId),
          Room: {  
            movie_theater_id: parseInt(theaterId),
          },
        },
        select: {
          id: true,
          show_date: true,
          start_time: true,
          end_time: true,
          price: true,
          Room: {   
            select: {
              id: true,
              movie_theater_id: true,
            },
          },
        },
      });
  
      res.status(200).json(showtimes);
    } catch (error) {
      console.error('Error fetching showtimes:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

}

module.exports = new ShowtimeController();
