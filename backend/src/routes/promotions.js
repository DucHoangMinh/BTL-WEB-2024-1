const express = require('express');
const promotionController = require('../app/controllers/PromotionController');

const router = express.Router();

// Tìm kiếm chương trình khuyến mãi
router.get('/search', promotionController.searchPromotions);

// Lấy tất cả các chương trình khuyến mãi
router.get('/', promotionController.getAllPromotions);

// Lấy chi tiết một chương trình khuyến mãi theo ID
router.get('/:id', promotionController.getPromotionById);

// Tạo mới một chương trình khuyến mãi
router.post('/', promotionController.createPromotion);

// Cập nhật thông tin chương trình khuyến mãi
router.put('/:id', promotionController.updatePromotion);

// Xóa một chương trình khuyến mãi
router.delete('/:id', promotionController.deletePromotion);

module.exports = router;
