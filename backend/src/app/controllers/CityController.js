// controllers/CityController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CityController {
 
  async getTheatersAndMoviesByCity(req, res) {
    const { cityName } = req.params; 
    console.log(cityName)
    try {
    
      const theaters = await prisma.movieTheater.findMany({
        where: { city: cityName },
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

      
      res.status(200).json({ theaters });
    } catch (error) {
      console.error('Error fetching theaters and movies by city:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getMovieBy
}

module.exports = new CityController();
