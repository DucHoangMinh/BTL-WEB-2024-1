const express = require('express');
const path = require('path');
const app = express();
const route = require('./routes');
const session = require('express-session');
const methodOverride = require('method-override');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const prismaSoftDeleteMiddleware = require('./middleware/prismaSoftDeleteMiddleware');

prisma.$use(prismaSoftDeleteMiddleware);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(
  session({
    secret: '123456',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'resources/views'));
app.use(express.static(path.join(__dirname, 'public')));

route(app);

app.post('/post', (req, res) => {
  console.log('Connected to React');
  res.redirect('/');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
