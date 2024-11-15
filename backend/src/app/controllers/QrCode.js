const axios = require('axios'); 

confirmPayment = async (req, res) => {
  const { room_id, seat_id } = req.params;
  const { user_id, showtime_id, promotion_id, amount } = req.body;
  const currentTime = new Date();

  try {
  
    const seat = await prisma.seat.findFirst({
      where: { id: parseInt(seat_id), room_id: parseInt(room_id), showtime_id: parseInt(showtime_id) },
    });

    if (!seat || seat.status !== 'on-hold' || seat.is_paid || seat.hold_until < currentTime) {
      return res.status(400).json({ message: 'Seat not available for payment.' });
    }

    await prisma.seat.update({
      where: { id: parseInt(seat_id) },
      data: { status: 'paid', is_paid: true, hold_until: null },
    });

  
    const newTicket = await prisma.ticket.create({
      data: {
        user_id: parseInt(user_id),
        showtime_id: parseInt(showtime_id),
        seat_id: parseInt(seat_id),
        promotion_id: promotion_id ? parseInt(promotion_id) : null,
        status: 'paid',
      },
    });

 
    const vietQrUrl = 'https://api.vietqr.io/v2/generate';
    const headers = {
      'x-client-id': process.env.VIETQR_CLIENT_ID, 
      'x-api-key': process.env.VIETQR_API_KEY, 
      'Content-Type': 'application/json',
    };
    const qrPayload = {
      accountNo: '113366668888',
      accountName: 'Your Company Name', 
      acqId: '970415', 
      amount, 
      addInfo: `Thanh toán vé ${newTicket.id}`, 
      template: 'compact', 
    };

    const qrResponse = await axios.post(vietQrUrl, qrPayload, { headers });

    if (!qrResponse.data || !qrResponse.data.data.qrDataURL) {
      return res.status(500).json({ message: 'Failed to generate QR code from VietQR' });
    }

    const qrCodeUrl = qrResponse.data.data.qrDataURL;

    return res.status(200).json({
      message: 'Payment confirmed, ticket created with QR code.',
      ticket: newTicket,
      qrCodeUrl, 
    });
  } catch (error) {
    console.error('Error during payment process:', error.response ? error.response.data : error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
