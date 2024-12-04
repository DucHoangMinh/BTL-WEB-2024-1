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
        where: { city: cityName, select: { name: true } },
        // include: {
        //   Showtimes: {
        //     include: {
        //       Movie: true
        //     }
        //   }
        // }
      });

      // const movies = [];
      // const movieSet = new Set();

      // theaters.forEach(theater => {
      //   theater.Showtimes.forEach(showtime => {
      //     if (!movieSet.has(showtime.Movie.id)) {
      //       movieSet.add(showtime.Movie.id);
      //       movies.push(showtime.Movie);
      //     }
      //   });
      // });

      
      const theaterNames = theaters.map(theater => theater.name);

      return res.status(200).json({ theaterNames });
    } catch (error) {
      console.error('Error fetching theaters and movies by city:', error);
      res.status(500).json({ message: 'Internal Server Error' });
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

  async getShowtimesByMovie(req, res) {
    const { movieId } = req.params;
    const { date } = req.query;

    if ( !movieId || !date) {
      return res.status(400).json({ message: 'theaterId, movieId, and date are required' });
    }

    try {
      const showtimes = await prisma.showtime.findMany({
        where: {
          movie_id: parseInt(movieId),
          show_date: new Date(date), // Thêm điều kiện ngày để lọc theo ngày được chọn
          
        },
        select: {
          id: true,
          show_date: true,
          start_time: true,
          end_time: true,
          price: true,
          Room: {
            select: {
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
  

  async 


}

module.exports = new CityController();
