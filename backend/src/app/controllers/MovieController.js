const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { bucket } = require('../../../firebaseConfig');

const uploadDir = path.join(__dirname, '../../../uploads'); 

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });  // Tạo thư mục nếu không tồn tại
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Sử dụng đường dẫn thư mục đã xác định
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Đặt tên file là timestamp
  },
});

const upload = multer({ storage: storage }).single('thumbnail');  // Đảm bảo trường 'thumbnail'

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
    console.log(req.body);  // Kiểm tra xem title có trong đây không

    // Xử lý upload thumbnail
    upload(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ message: 'Error uploading thumbnail' });
      }
  
      // Kiểm tra xem file đã được upload chưa
      if (!req.file) {
        return res.status(400).json({ message: 'No thumbnail uploaded' });
      }
  
      try {
        // Đọc file thumbnail từ thư mục uploads
        const thumbnailPath = path.join(__dirname, '../../../uploads', req.file.filename);
        const storageRef = bucket.file(`thumbnails/${req.file.filename}`);  // Đường dẫn đến Firebase Storage
  
        // Upload thumbnail lên Firebase Storage
        await storageRef.save(fs.readFileSync(thumbnailPath), {
          contentType: req.file.mimetype,  // Đặt kiểu nội dung cho file
        });
  
        // Lấy URL của file thumbnail đã upload
        const thumbnailUrl = `https://storage.googleapis.com/${bucket.name}/thumbnails/${req.file.filename}`;
  
        // Tạo mới bộ phim trong cơ sở dữ liệu
        const newMovie = await prisma.movie.create({
          data: {
            title,
            genre,
            duration,
            rating,
            // release_date: releaseDate,  // Sử dụng đối tượng Date đã kiểm tra
            description,
            thumbnail: thumbnailUrl,  // Lưu URL của thumbnail vào cơ sở dữ liệu
            trailer,
            relatedThumbnail,
            ranking,
            basic_info,
          },
        });
  
        // Xóa file thumbnail tạm thời sau khi upload thành công
        fs.unlinkSync(thumbnailPath);
  
        return res.status(201).json({
          message: 'Tạo phim mới thành công',
          movie: newMovie,
        });
      } catch (error) {
        console.error('Error while creating a new movie:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    });
  };  

}

module.exports = new MovieController();
