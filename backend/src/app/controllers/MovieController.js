const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MovieController {
  // Lấy toàn bộ danh sách phim
  getAllMovies = async (req, res) => {
    try {
      const allMovies = await prisma.movie.findMany({
        include: {
          Showtimes: true,
          // Feedbacks: true,
        },
      });

      return res.status(200).json({
        message: 'Danh sách tất cả phim',
        movies: allMovies,
      });
    } catch (error) {
      console.error('Error while fetching all movies:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Lấy ra các bộ phim đang chiếu
  getNowShowingMovies = async (req, res) => {
    try {
      const currentDate = new Date();
      const nowShowingMovies = await prisma.movie.findMany({
        where: {
          release_date: {
            lte: currentDate,
          },
        },
        include: {
          Showtimes: true,
          Feedbacks: true,
        },
      });

      return res.status(200).json({
        message: 'Danh sách phim đang chiếu',
        movies: nowShowingMovies,
      });
    } catch (error) {
      console.error('Error while fetching now showing movies:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Lấy ra các bộ phim sắp chiếu
  getUpcomingMovies = async (req, res) => {
    try {
      const currentDate = new Date();
      const upcomingMovies = await prisma.movie.findMany({
        where: {
          release_date: {
            gt: currentDate,
          },
        },
        include: {
          Showtimes: true,
          Feedbacks: true,
        },
      });

      return res.status(200).json({
        message: 'Danh sách phim sắp chiếu',
        movies: upcomingMovies,
      });
    } catch (error) {
      console.error('Error while fetching upcoming movies:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Lấy thông tin phim theo ID
  getMovieById = async (req, res) => {
    const { id } = req.params;

    try {
      const movie = await prisma.movie.findUnique({
        where: { id: parseInt(id) },
        include: {
          Showtimes: true,
          Feedbacks: true,
        },
      });

      if (!movie) {
        return res.status(404).json({ message: 'Phim không tồn tại' });
      }

      return res.status(200).json({
        message: 'Thông tin phim',
        movie,
      });
    } catch (error) {
      console.error('Error while fetching movie by ID:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Tạo một bộ phim mới
  createMovie = async (req, res) => {
    const {
      title,
      genre,
      duration,
      rating,
      release_date,
      description,
      thumbnail,
      trailer,
      relatedThumbnail,
      ranking,
      basic_info,
    } = req.body;

    try {
      const newMovie = await prisma.movie.create({
        data: {
          title,
          genre,
          duration,
          rating,
          release_date: new Date(release_date),
          description,
          thumbnail,
          trailer,
          relatedThumbnail,
          ranking,
          basic_info,
        },
      });

      return res.status(201).json({
        message: 'Tạo phim mới thành công',
        movie: newMovie,
      });
    } catch (error) {
      console.error('Error while creating a new movie:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Cập nhật thông tin của một bộ phim
  updateMovie = async (req, res) => {
    const { id } = req.params;
    const {
      title,
      genre,
      duration,
      rating,
      release_date,
      description,
      thumbnail,
      trailer,
      relatedThumbnail,
      ranking,
      basic_info,
    } = req.body;

    try {
      const updatedMovie = await prisma.movie.update({
        where: { id: parseInt(id) },
        data: {
          title,
          genre,
          duration,
          rating,
          release_date: new Date(release_date),
          description,
          thumbnail,
          trailer,
          relatedThumbnail,
          ranking,
          basic_info,
        },
      });

      return res.status(200).json({
        message: 'Cập nhật phim thành công',
        movie: updatedMovie,
      });
    } catch (error) {
      console.error('Error while updating movie:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Xóa một bộ phim dựa vào ID
  deleteMovie = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedMovie = await prisma.movie.delete({
        where: { id: parseInt(id) },
      });

      return res.status(200).json({
        message: 'Xóa phim thành công',
        movie: deletedMovie,
      });
    } catch (error) {
      console.error('Error while deleting movie:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  //Lấy ra các thành phố có phim đã chọn 
  async getCitiesByMovieId(req, res) {
    const { movieId } = req.params;

    try {
      const cities = await prisma.movieTheater.findMany({
        where: {
          Rooms: {
            some: {
              Showtime: {
                some: {
                  movie_id: parseInt(movieId),
                },
              },
            },
          },
        },
        select: { city: true },
        distinct: ['city'],
      });

      res.status(200).json({ cities });
    } catch (error) {
      console.error('Error fetching cities:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new MovieController();
