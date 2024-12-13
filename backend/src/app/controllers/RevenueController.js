const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

class RevenueController {
  // Lấy doanh thu theo khoảng thời gian (ngày bắt đầu, ngày kết thúc)
  getRevenueByDateRange = async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    try {
      const start = new Date(startDate);
      let end = new Date(endDate);

      end.setDate(end.getDate() + 1);

      if (start > end) {
        return res.status(400).json({ message: 'Start date cannot be later than end date' });
      }

      const revenue = await prisma.ticket.findMany({
        where: {
          purchase_date: {
            gte: start.toISOString(),
            lte: end.toISOString(),
          },
        },
        include: {
          Seat: true,
        },
      });

      const totalRevenue = revenue.reduce((total, ticket) => {
        return total + (ticket.Seat ? ticket.Seat.price : 0);
      }, 0);

      return res.status(200).json({
        message: `Doanh thu từ ${startDate} đến ${endDate}`,
        revenue: totalRevenue,
      });
    } catch (error) {
      console.error('Error fetching revenue for the date range:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Lấy doanh thu theo tháng
  getRevenueByMonth = async (req, res) => {
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({ message: 'Year and month are required' });
    }

    try {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);

      const revenue = await prisma.ticket.findMany({
        where: {
          purchase_date: {
            gte: startDate.toISOString(),
            lt: endDate.toISOString(),
          },
        },
        include: {
          Seat: true,  
        },
      });

      const totalRevenue = revenue.reduce((total, ticket) => {
        return total + (ticket.Seat ? ticket.Seat.price : 0);
      }, 0);

      return res.status(200).json({
        message: `Doanh thu tháng ${month} năm ${year}`,
        revenue: totalRevenue,
      });
    } catch (error) {
      console.error('Error fetching monthly revenue:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Lấy doanh thu theo năm 
  getRevenueByYear = async (req, res) => {
    const { year } = req.query;

    if (!year) {
      return res.status(400).json({ message: 'Year is required' });
    }

    try {
      const startDate = new Date(year, 0, 1); 
      const endDate = new Date(year, 12, 31);

      const revenue = await prisma.ticket.findMany({
        where: {
          purchase_date: {
            gte: startDate.toISOString(),
            lt: endDate.toISOString(),
          },
        },
        include: {
          Seat: true, 
        },
      });

      const totalRevenue = revenue.reduce((total, ticket) => {
        return total + (ticket.Seat ? ticket.Seat.price : 0);
      }, 0);

      return res.status(200).json({
        message: `Doanh thu năm ${year}`,
        revenue: totalRevenue,
      });
    } catch (error) {
      console.error('Error fetching yearly revenue:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

module.exports = new RevenueController();
