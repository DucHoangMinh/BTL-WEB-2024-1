const express = require('express');
const registerRouter = require('./register');
const loginRouter = require('./login');

const authenticateToken = require('../middleware/prismaAuthMiddleware');  

function route(app) {
  app.use('/register', registerRouter);
  app.use('/login', loginRouter);

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
