const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PromotionController {
  // Lấy danh sách tất cả các chương trình khuyến mãi
  getAllPromotions = async (req, res) => {
    try {
      const promotions = await prisma.promotion.findMany({
        include: {
          Tickets: true // Bao gồm thông tin vé liên quan đến chương trình khuyến mãi
        }
      });
      return res.status(200).json({
        message: 'Danh sách chương trình khuyến mãi',
        promotions
      });
    } catch (error) {
      console.error('Error while fetching promotions:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Lấy thông tin chi tiết của một chương trình khuyến mãi theo ID
  getPromotionById = async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    try {
      const promotion = await prisma.promotion.findUnique({
        where: { id: parseInt(id) },
        include: {
          Tickets: true
        }
      });

      if (!promotion) {
        return res.status(404).json({ message: 'Chương trình khuyến mãi không tồn tại' });
      }

      return res.status(200).json({
        message: 'Thông tin chương trình khuyến mãi',
        promotion
      });
    } catch (error) {
      console.error('Error while fetching promotion by ID:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Tạo một chương trình khuyến mãi mới
  createPromotion = async (req, res) => {
    const { promotion_name, description, discount_percentage, start_date, end_date, location, thumbnail } = req.body;

    try {
      const newPromotion = await prisma.promotion.create({
        data: {
          promotion_name,
          description,
          discount_percentage,
          start_date: new Date(start_date),
          end_date: new Date(end_date),
          location,
          thumbnail
        }
      });

      return res.status(201).json({
        message: 'Tạo chương trình khuyến mãi thành công',
        promotion: newPromotion
      });
    } catch (error) {
      console.error('Error while creating promotion:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Cập nhật thông tin của một chương trình khuyến mãi
  updatePromotion = async (req, res) => {
    const { id } = req.params;
    const { promotion_name, description, discount_percentage, start_date, end_date, location, thumbnail } = req.body;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    try {
      const updatedPromotion = await prisma.promotion.update({
        where: { id: parseInt(id) },
        data: {
          promotion_name,
          description,
          discount_percentage,
          start_date: new Date(start_date),
          end_date: new Date(end_date),
          location,
          thumbnail
        }
      });

      return res.status(200).json({
        message: 'Cập nhật chương trình khuyến mãi thành công',
        promotion: updatedPromotion
      });
    } catch (error) {
      console.error('Error while updating promotion:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Xóa một chương trình khuyến mãi
  deletePromotion = async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    try {
      const deletedPromotion = await prisma.promotion.delete({
        where: { id: parseInt(id) }
      });

      return res.status(200).json({
        message: 'Xóa chương trình khuyến mãi thành công',
        promotion: deletedPromotion
      });
    } catch (error) {
      console.error('Error while deleting promotion:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

module.exports = new PromotionController();
