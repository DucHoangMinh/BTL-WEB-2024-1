const express = require('express');
const router = express.Router();
const revenueController = require('../app/controllers/RevenueController');

// Lấy doanh thu theo tuần
router.get('/date-range', revenueController.getRevenueByDateRange);

// Lấy doanh thu theo tháng
router.get('/month', revenueController.getRevenueByMonth);

// Lấy doanh thu theo năm
router.get('/year', revenueController.getRevenueByYear);

module.exports = router;
