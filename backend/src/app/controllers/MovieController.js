const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs');
const {db, bucket } = require('../../../firebaseConfig');


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

  async getMoviesByCityAndMovieTheater(req, res) {
    try {
      const { city, theaterId, selectedDate } = req.query;
  
      if (!city || !theaterId || !selectedDate) {
        return res.status(400).json({ message: 'City, theaterId, and selectedDate are required' });
      }
  
      const date = new Date(selectedDate);
      if (isNaN(date)) {
        return res.status(400).json({ message: 'Invalid date format' });
      }
  
      const movies = await prisma.movie.findMany({
        where: {
          Showtimes: {
            some: {
              Room: {
                MovieTheater: {
                  city: city, 
                  id: parseInt(theaterId), // Kiểm tra ID của rạp chiếu
                },
              },
              start_time: {
                gte: new Date(date.setHours(0, 0, 0, 0)), 
                lt: new Date(date.setHours(23, 59, 59, 999)), 
              },
            },
          },
        },
        include: {
          Showtimes: {
            where: {
              Room: {
                movie_theater_id: parseInt(theaterId),
              },
              start_time: {
                gte: new Date(date.setHours(0, 0, 0, 0)),
                lt: new Date(date.setHours(23, 59, 59, 999)),
              },
            },
            select: {
              id: true,  
            },
          },
        },
      });
  
      if (movies.length === 0) {
        return res.status(404).json({ message: 'No movies found for the selected date and theater' });
      }
  
      const result = movies.map(movie => ({
        id: movie.id,
        title: movie.title,
        genre: movie.genre,
        duration: movie.duration,
        rating: movie.rating,
        release_date: movie.release_date,
        description: movie.description,
        thumbnail: movie.thumbnail,
        ranking: movie.ranking,
      }));
  
      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  

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
      console.log(newMovie);

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

  //Lấy ra các thành phố có phim đã chọn thuộc ngày đã chọn
  async getCitiesByMovieId(req, res) {
    const { movieId } = req.params;
    const { date } = req.query; 
  
    try {
      const selectedDate = new Date(date);
      selectedDate.setUTCHours(0, 0, 0, 0); // Đặt thời gian về 0h00 để chỉ so sánh phần ngày
  
      const cities = await prisma.movieTheater.findMany({
        where: {
          Rooms: {
            some: {
              Showtime: {
                some: {
                  movie_id: parseInt(movieId),
                  show_date: selectedDate, // Chỉ so sánh phần ngày đã chọn
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
  

  getMoviesByDate = async(req, res) => {
    const { date } = req.params;

    try {
   
      const selectedDate = new Date(date);
      selectedDate.setUTCHours(0, 0, 0, 0);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);

      const movies = await prisma.showtime.findMany({
        where: {
          show_date: {
            gte: selectedDate,
            lt: nextDay
          }
        },
        include: {
          Movie: true,
      },
    });


      const uniqueMovies = [...new Map(movies.map(showtime => [showtime.Movie.id, showtime.Movie])).values()];

      res.status(200).json({
        message: `Danh sách phim vào ngày ${date}`,
        movies: uniqueMovies,
      });
    } catch (error) {
      console.error('Error fetching movies by date:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  createMovie2 = async (req, res) => {
    console.log(req.body);
    const {
      title,
      genre,
      duration,
      rating,
      release_date,
      description,
      trailer,
      relatedThumbnail,
      ranking,
      basic_info,
    } = req.body;
    let validDuration = parseInt(duration, 10);
    let validRating = parseFloat(rating);
    if (!req.file) {
      return res.status(400).json({ message: 'No thumbnail uploaded' });
    }

    try {
      const thumbnailPath = path.join(__dirname, '../../../uploads', req.file.filename);

      const storageRef = bucket.file(`thumbnails/${req.file.filename}`);

      await storageRef.save(fs.readFileSync(thumbnailPath), {
        contentType: req.file.mimetype,  
      });

      const thumbnailUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/thumbnails%2F${req.file.filename}?alt=media`;

      const newMovie = await prisma.movie.create({
        data: {
          title,
          genre,
          duration: validDuration,
          rating: validRating,
          release_date: new Date(release_date),  
          description,
          thumbnail: thumbnailUrl,  
          trailer,
          relatedThumbnail,
          ranking,
          basic_info,
        },
      });
      fs.unlinkSync(thumbnailPath);

      return res.status(201).json({
        message: 'Tạo phim mới thành công',
        movie: newMovie,
      });
    } catch (error) {
      console.error('Error while creating a new movie:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  async getMovieAndTheaterDetails(req, res) {
    const { movieId } = req.params;

    if (!movieId) {
      return res.status(400).json({ message: 'Movie ID is required.' });
    }

    try {
      // Bước 1: Truy vấn thông tin phim từ movie_id
      const movie = await prisma.movie.findUnique({
        where: { id: parseInt(movieId) },
        include: {
          Showtimes: {
            select: {
              id: true,
              start_time: true,
              end_time: true,
              room_id: true, // Lấy room_id để xử lý tiếp
            },
          },
        },
      });

      if (!movie) {
        return res.status(404).json({ message: 'Movie not found.' });
      }

      const currentTime = new Date();

      // Bước 2: Truy vấn thông tin room và movieTheater từ room_id
      const detailedShowtimes = await Promise.all(
        movie.Showtimes.map(async (showtime) => {
          const room = await prisma.room.findUnique({
            where: { id: showtime.room_id },
            select: {
              id: true,
              name: true,
              movie_theater_id: true, // Lấy theater_id từ room
            },
          });

          if (!room) {
            throw new Error(`Room with ID ${showtime.room_id} not found.`);
          }

          const movieTheater = await prisma.movieTheater.findUnique({
            where: { id: room.movie_theater_id },
            select: {
              id: true,
              name: true,
              city: true,
            },
          });

          if (!movieTheater) {
            throw new Error(`MovieTheater with ID ${room.theater_id} not found.`);
          }

          // Kiểm tra trạng thái upcoming và đặt giá trị tương ứng
          const status = new Date(showtime.start_time) > currentTime ? 'up-coming' : 'now-showing';

          return {
            showtime_id: showtime.id,
            start_time: showtime.start_time,
            end_time: showtime.end_time,
            status, // Trả về trạng thái up-coming hoặc now-showing
            room: {
              id: room.id,
              name: room.name,
            },
            theater: {
              id: movieTheater.id,
              name: movieTheater.name,
              city: movieTheater.city,
            },
          };
        })
      );

      // Trả về thông tin phim và suất chiếu chi tiết
      return res.status(200).json({
        movie: {
          id: movie.id,
          title: movie.title,
          genre: movie.genre,
          duration: movie.duration,
          description: movie.description,
        },
        showtimes: detailedShowtimes,
      });
    } catch (error) {
      console.error('Error fetching movie and theater details:', error.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new MovieController();
