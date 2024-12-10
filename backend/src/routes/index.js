const express = require('express');
const registerRouter = require('./register');
const loginRouter = require('./login');
const movieRouter = require('./movies');
const promotionRouter = require('./promotions');
const movieTheaterRouter = require('./movieTheater');
const roomRouter = require('./rooms');
// const seatRouter = require('./seats');  
const seatRouter = require('./seats');
const showtimeRouter = require('./showtime');
const userRouter = require('./user');
const authenticateToken = require('../middleware/prismaAuthMiddleware');  
const cityRouter = require('./city');

function route(app) {
  app.use('/register', registerRouter);
  app.use('/login', loginRouter);
  app.use('/movies', movieRouter);
  app.use('/promotions', promotionRouter);
  app.use('/movie-theaters', movieTheaterRouter);
  app.use('/rooms', roomRouter);
  // app.use('/rooms', seatRouter);
  app.use('/showtimes', showtimeRouter);
  app.use("/city",cityRouter);
  app.use("/seat", seatRouter)
  app.use('/user', userRouter);
  app.get('/protected', authenticateToken, (req, res) => {
    res.json({
      message: 'This is a protected route. You are authenticated.',
      user: req.user,  
    });
  });
  
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

module.exports = route;
