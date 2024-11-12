const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

cron.schedule('* * * * *', async () => {
  const currentTime = new Date();

  try {
    
    const expiredSeats = await prisma.seat.findMany({
      where: {
        status: 'on-hold',
        hold_until: { lt: currentTime },
        is_paid: false
      },
    });

    if (expiredSeats.length > 0) {
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
    } else {
      // console.log("No expired seats to release.");
    }
  } catch (error) {
    console.error('Error releasing expired seats:', error);
  }
});
