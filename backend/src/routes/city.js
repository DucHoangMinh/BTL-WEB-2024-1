// routes/city.js
const express = require('express');
const CityController = require('../app/controllers/CityController');

const router = express.Router();

router.get('/cities', CityController.getCityList);
router.get('/:cityName/theaters-and-movies', CityController.getTheatersAndMoviesByCity);

router.get('/movieId/:theaterName', CityController.getMovieIdsByTheaterName);
module.exports = router;
