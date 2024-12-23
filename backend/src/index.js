const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const route = require('./routes');
const session = require('express-session');
const methodOverride = require('method-override');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cron = require('node-cron'); // Import node-cron

app.use(cors());
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

route(app);

app.post('/post', (req, res) => {
  console.log('Connected to React');
  res.redirect('/');
});

app.get('/', (req, res) => {
  res.send("API running successfully");
});

require("./app/cronJob.js");


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
