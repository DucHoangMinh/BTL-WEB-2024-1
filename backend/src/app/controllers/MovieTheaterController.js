const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

class MovieTheaterController {
  // Lấy danh sách tất cả các rạp chiếu phim
  getAllMovieTheaters = async (req, res) => {
    try {
      const movieTheaters = await prisma.movieTheater.findMany({
        // include: {
        //   Rooms: true  
        // }
      });
      return res.status(200).json(movieTheaters);
    } catch (error) {
      console.error('Error fetching movie theaters:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Lấy thông tin chi tiết về một rạp chiếu phim
  getMovieTheaterById = async (req, res) => {
    const { id } = req.params;
    try {
      const movieTheater = await prisma.movieTheater.findUnique({
        where: { id: parseInt(id) },
        include: {
          Rooms: true  // Bao gồm danh sách các phòng chiếu trong rạp
        }
      });

      if (!movieTheater) {
        return res.status(404).json({ message: 'Movie Theater not found' });
      }

      return res.status(200).json(movieTheater);
    } catch (error) {
      console.error('Error fetching movie theater:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Tạo một rạp chiếu phim mới
  createMovieTheater = async (req, res) => {
    const {
      name,
      location,
      city,
      total_rooms,
      capacity,
      has_3d,
      has_imax,
      has_dolby_atmos,
      contact_email,
      contact_phone,
      website_url
    } = req.body;

    try {
      const newMovieTheater = await prisma.movieTheater.create({
        data: {
          name,
          location,
          city,
          total_rooms,
          capacity,
          has_3d,
          has_imax,
          has_dolby_atmos,
          contact_email,
          contact_phone,
          website_url
        }
      });

      return res.status(201).json(newMovieTheater);
    } catch (error) {
      console.error('Error creating movie theater:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Cập nhật thông tin của một rạp chiếu phim
  updateMovieTheater = async (req, res) => {
    const { id } = req.params;
    const {
      name,
      location,
      city,
      total_rooms,
      capacity,
      has_3d,
      has_imax,
      has_dolby_atmos,
      contact_email,
      contact_phone,
      website_url
    } = req.body;

    try {
      const updatedMovieTheater = await prisma.movieTheater.update({
        where: { id: parseInt(id) },
        data: {
          name,
          location,
          city,
          total_rooms,
          capacity,
          has_3d,
          has_imax,
          has_dolby_atmos,
          contact_email,
          contact_phone,
          website_url
        }
      });

      return res.status(200).json(updatedMovieTheater);
    } catch (error) {
      console.error('Error updating movie theater:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Xóa một rạp chiếu phim
  deleteMovieTheater = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedMovieTheater = await prisma.movieTheater.delete({
        where: { id: parseInt(id) }
      });

      return res.status(200).json({
        message: 'Movie Theater deleted successfully',
        deletedMovieTheater
      });
    } catch (error) {
      console.error('Error deleting movie theater:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  //Lấy danh sách rạp trong thành phố có chiếu phim
  async getTheatersByCityAndMovie(req, res) {
    const { city, movieId, date } = req.query;

    if (!city || !movieId || !date) {
      return res.status(400).json({ message: 'city, movieId, and date are required' });
    }

    try {
      const theaters = await prisma.movieTheater.findMany({
        where: {
          city: city,
          Rooms: {
            some: {
              Showtime: {
                some: {
                  movie_id: parseInt(movieId),
                  show_date: new Date(date), 
                },
              },
            },
          },
        },
        select: { id: true, name: true },
      });

      if (theaters.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy rạp nào có phim này trong thành phố và ngày đã chọn' });
      }

      res.status(200).json(theaters);
    } catch (error) {
      console.error('Error fetching theaters:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // async getTheatersWithShowtimesByCityAndMovie(req, res) {
  //   const { city, movieId, date } = req.query;
  
  //   // Kiểm tra đầu vào
  //   if (!city || !movieId || !date) {
  //     return res.status(400).json({ message: 'city, movieId, and date are required' });
  //   }
  
  //   try {
  //     const theaters = await prisma.movieTheater.findMany({
  //       where: {
  //         city: city,
  //         Rooms: {
  //           some: {
  //             Showtime: {
  //               some: {
  //                 movie_id: parseInt(movieId),
  //                 show_date: new Date(date),
  //               },
  //             },
  //           },
  //         },
  //       },
  //       select: {
  //         id: true,
  //         name: true,
  //         Rooms: {
  //           select: {
  //             id: true,
  //             name: true,
  //             Showtime: {
  //               where: {
  //                 movie_id: parseInt(movieId),
  //                 show_date: new Date(date),
  //               },
  //               select: {
  //                 id: true,
  //                 show_date: true,
  //                 start_time: true,
  //                 end_time: true,
  //                 price: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     });
  
  //     // Kiểm tra nếu không có rạp nào được tìm thấy
  //     if (theaters.length === 0) {
  //       return res.status(404).json({ message: 'Không tìm thấy rạp nào có phim này trong thành phố và ngày đã chọn' });
  //     }
  
  //     // Lọc chỉ giữ lại các phòng có suất chiếu
  //     const result = theaters.map(theater => ({
  //       id: theater.id,
  //       name: theater.name,
  //       rooms: theater.Rooms.filter(room => room.Showtime.length > 0).map(room => ({
  //         id: room.id,
  //         name: room.name,
  //         showtimes: room.Showtime,
  //       })),
  //     })).filter(theater => theater.rooms.length > 0);
  
  //     res.status(200).json(result);
  //   } catch (error) {
  //     console.error('Error fetching theaters and showtimes:', error);
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   }
  // }
  async getTheatersWithShowtimesByCityAndMovie(req, res) {

    const { city, movieId, date, movieTheaterId } = req.query;
  
    if (!city || !movieId || !date || !movieTheaterId) {
      return res.status(400).json({ message: 'city, movieId, date, and movieTheaterId are required' });
    }
  
    try {
      const showtimes = await prisma.showtime.findMany({
        where: {
          movie_id: parseInt(movieId),
          show_date: new Date(date),
          Room: {
            MovieTheater: {
              id: parseInt(movieTheaterId),
              city: city,
            },
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
              name: true,
            },
          },
        },
      });
  
      if (showtimes.length === 0) {
        return res.status(404).json({ message: 'Không có suất chiếu nào phù hợp với các tham số được cung cấp' });
      }
  
      res.status(200).json(showtimes);
    } catch (error) {
      console.error('Error fetching showtimes:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
  

  getMovieTheatersByDate = async(req, res) => {
    const { movieId, date } = req.params;

    try {
      // Chuyển đổi `date` về định dạng `yy-mm-dd`
      const selectedDate = new Date(date);
      selectedDate.setUTCHours(0, 0, 0, 0);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);

      // Truy vấn các suất chiếu của phim vào ngày đã chọn
      const showtimes = await prisma.showtime.findMany({
        where: {
          movie_id: parseInt(movieId),
          show_date: {
            gte: selectedDate,
            lt: nextDay
          }
        },
        include: {
          Room: {
            include: {
              MovieTheater: true,
            }
          },
        },
      });

      // Kiểm tra nếu không có suất chiếu nào
      if (showtimes.length === 0) {
        return res.status(404).json({ message: `No showtimes found for movie ID ${movieId} on date ${date}` });
      }

      res.status(200).json({
        message: `Danh sách suất chiếu của phim ID ${movieId} vào ngày ${date}`,
        showtimes: showtimes,
      });
    } catch (error) {
      console.error('Error fetching showtimes by movie and date:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new MovieTheaterController();
