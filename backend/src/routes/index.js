const registerRouter = require('./register');
const loginRouter = require('./login');

function route(app) {
  app.use('/register', registerRouter);
  app.use('/login', loginRouter);
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

module.exports = route;
