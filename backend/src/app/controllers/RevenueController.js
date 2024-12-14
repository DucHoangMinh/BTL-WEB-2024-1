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
            lt: end.toISOString(),
          },
        },
        include: {
          Seat: true,
        },
      });
  
      const dailyRevenue = {};
      revenue.forEach(ticket => {
        const purchaseDate = new Date(ticket.purchase_date).toISOString().split('T')[0]; 
        const price = ticket.Seat ? ticket.Seat.price : 0;
        if (!dailyRevenue[purchaseDate]) {
          dailyRevenue[purchaseDate] = 0;
        }
        dailyRevenue[purchaseDate] += price;
      });
  
      const allDaysRevenue = {};
      for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        const dayString = d.toISOString().split('T')[0]; 
        allDaysRevenue[dayString] = dailyRevenue[dayString] || 0;
      }
  
      return res.status(200).json({
        message: `Doanh thu từ ${startDate} đến ${endDate}`,
        dailyRevenue: allDaysRevenue,
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
  
      const dailyRevenue = {};
      revenue.forEach(ticket => {
        const purchaseDate = new Date(ticket.purchase_date).toISOString().split('T')[0]; 
        const price = ticket.Seat ? ticket.Seat.price : 0;
        if (!dailyRevenue[purchaseDate]) {
          dailyRevenue[purchaseDate] = 0;
        }
        dailyRevenue[purchaseDate] += price;
      });
  
      const allDaysRevenue = {};
      const daysInMonth = new Date(year, month, 0).getDate();
      for (let d = 1; d <= daysInMonth; d++) {
        const dayString = `${year}-${month < 10 ? '0' + month : month}-${d < 10 ? '0' + d : d}`;
        allDaysRevenue[dayString] = dailyRevenue[dayString] || 0;
      }
  
      return res.status(200).json({
        message: `Doanh thu tháng ${month} năm ${year}`,
        dailyRevenue: allDaysRevenue,
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
  
      // Nhóm doanh thu theo tháng
      const monthlyRevenue = {};
      revenue.forEach(ticket => {
        const purchaseDate = new Date(ticket.purchase_date);
        const month = purchaseDate.getMonth() + 1; 
        const yearMonth = `${purchaseDate.getFullYear()}-${month < 10 ? '0' + month : month}`;
  
        const price = ticket.Seat ? ticket.Seat.price : 0;
        if (!monthlyRevenue[yearMonth]) {
          monthlyRevenue[yearMonth] = 0;
        }
        monthlyRevenue[yearMonth] += price;
      });
  
      const allMonthsRevenue = {};
      for (let month = 1; month <= 12; month++) {
        const yearMonth = `${year}-${month < 10 ? '0' + month : month}`;
        allMonthsRevenue[yearMonth] = monthlyRevenue[yearMonth] || 0;
      }
  
      return res.status(200).json({
        message: `Doanh thu năm ${year}`,
        monthlyRevenue: allMonthsRevenue,
      });
    } catch (error) {
      console.error('Error fetching yearly revenue:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  
}

module.exports = new RevenueController();
