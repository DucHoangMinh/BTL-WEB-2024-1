// routes/city.js
const express = require('express');
const CityController = require('../app/controllers/CityController');

const router = express.Router();

router.get('/:cityName/theaters-and-movies', CityController.getTheatersAndMoviesByCity);

router.get('./:movieId/movie-showtime', CityController.getShowtimesByMovie)
module.exports = router;
