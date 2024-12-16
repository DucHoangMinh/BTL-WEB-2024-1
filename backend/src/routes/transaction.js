const express = require('express');
const router = express.Router();
const TransactionController  = require('../app/controllers/TransactionController');

router.post('/confirm', TransactionController.createTransaction);
router.post('/check-description', TransactionController.checkDescription);

module.exports = router;
