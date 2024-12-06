// controllers/CityController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CityController {
  
  async getCityList(req, res) {
    try {
    
      const cities = await prisma.movieTheater.findMany({
        select: { city: true },
        distinct: ['city'], 
      });

      if (cities.length === 0) {
        return res.status(404).json({ message: 'No cities found.' });
      }

    
      const cityList = cities.map(city => city.city);

      return res.status(200).json({ cities: cityList });
    } catch (error) {
      console.error('Error fetching city list:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } 

  async getTheatersAndMoviesByCity(req, res) {
    const { cityName } = req.params;

    try {
     
      const theaters = await prisma.movieTheater.findMany({
        where: { city: cityName },
        select: { name: true }, 
      });

      if (theaters.length === 0) {
        return res.status(404).json({ message: 'No movie theaters found in the specified city.' });
      }

      const theaterIds = theaters.map(theater => theater.id);

      return res.status(200).json({ theaterIds });
    } catch (error) {
      console.error('Error fetching movie theaters by city:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getRoomFromTheater(req,res) {
      const {theaterName} = req.params;
      try {
        const roomIds = await prisma.room.findMany({
          where:{ theaters: theaterName, select: {id: true}}
        });
        const roomids = roomIds.map(room => room.id);
        return res.status(200).json(roomids);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  }

  async getMovieIdsByTheaterName(req, res) {
    const { theaterName } = req.params;

    try {
    
      const theater = await prisma.movieTheater.findFirst({
        where: { name: theaterName },
        select: { id: true }, 
      });

      if (!theater) {
        return res.status(404).json({ message: 'Theater not found.' });
      }

      const theaterId = theater.id;

      
      const rooms = await prisma.room.findMany({
        where: { movie_theater_id: theaterId },
        select: { id: true }, 
      });

      if (rooms.length === 0) {
        return res.status(404).json({ message: 'No rooms found for this theater.' });
      }

      const roomIds = rooms.map(room => room.id);

      const showtimes = await prisma.showtime.findMany({
        where: { room_id: { in: roomIds } },
        select: { movie_id: true }, 
      });

      if (showtimes.length === 0) {
        return res.status(404).json({ message: 'No showtimes found for this theater.' });
      }

      const movieIds = [...new Set(showtimes.map(showtime => showtime.movie_id))]; // Loại bỏ trùng lặp movie_id

     
      const movies = await prisma.movie.findMany({
        where: { id: { in: movieIds } },
        select: { id: true, title: true }, 
      });

      if (movies.length === 0) {
        return res.status(404).json({ message: 'No movies found for this theater.' });
      }

      return res.status(200).json({
        message: 'Danh sách phim theo rạp',
        movies,
        movieIds
      });
    } catch (error) {
      console.error('Error fetching movies by theater name:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

}

module.exports = new CityController();
