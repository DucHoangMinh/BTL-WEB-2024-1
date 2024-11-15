const express = require('express');
const qrPaymentController = require('../app/controllers/QrPaymentController');

const router = express.Router();

router.post('/create-qr', qrPaymentController.create);

module.exports = router;