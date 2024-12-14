const express = require('express');
const router = express.Router();
const TransactionController  = require('../app/controllers/TransactionController');

router.post('/confirm', TransactionController.createTransaction);

module.exports = router;
