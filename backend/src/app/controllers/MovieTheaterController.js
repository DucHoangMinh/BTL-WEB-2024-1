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
}

module.exports = new MovieTheaterController();
