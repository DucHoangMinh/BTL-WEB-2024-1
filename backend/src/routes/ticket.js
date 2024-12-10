// routes/city.js
const express = require('express');
const TicketController = require('../app/controllers/TicketController')
const router = express.Router();

router.get('/:user_id', TicketController.getDetailedTicketsByUser);

module.exports = router;
