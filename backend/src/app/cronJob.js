const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const pageSize = 500; // Số lượng ghế mỗi lần cron job xử lý
let page = 0;

cron.schedule('* * * * *', async () => {
  const currentTime = new Date();
  
  try {
    while (true) {
      const expiredSeats = await prisma.seat.findMany({
        where: {
          status: 'on-hold',
          hold_until: { lt: currentTime },
          is_paid: false,
        },
        skip: page * pageSize, 
        take: pageSize, 
      });

      if (expiredSeats.length === 0) break;

      const seatIds = expiredSeats.map(seat => seat.id);

      await prisma.seat.updateMany({
        where: {
          id: { in: seatIds }
        },
        data: {
          status: 'available',
          hold_until: null
        }
      });

      console.log(`${seatIds.length} expired seats have been released.`);

      page += 1; 
    }
  } catch (error) {
    console.error('Error releasing expired seats:', error);
  }
});
