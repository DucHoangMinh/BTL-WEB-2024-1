const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios'); 

class SeatsController {

  getSeatsByRoom = async (req, res) => {
    const { room_id } = req.params;

    try {
        const seats = await prisma.seat.findMany({
            where: { room_id: parseInt(room_id) },
            orderBy: [
                { row: 'asc' },     // Sắp xếp theo hàng (A, B, C, ...)
                { column: 'asc' }   // Sắp xếp theo cột (1, 2, 3, ...)
            ]
        });

        if (seats.length === 0) {
            return res.status(404).json({ message: 'No seats found for this room' });
        }

        return res.status(200).json(seats);
    } catch (error) {
        console.error('Error fetching seats:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


  // Thêm một hoặc nhiều ghế vào phòng chiếu
//   createSeats = async (req, res) => {
//     const { room_id } = req.params;
//     const seats = req.body.seats; // Mảng các ghế được truyền từ request body

//     if (!seats || seats.length === 0) {
//       return res.status(400).json({ message: 'Array of seats is required' });
//     }

//     // Kiểm tra xem tất cả các trường bắt buộc đã được cung cấp hay chưa
//     for (let seat of seats) {
//       const { seat_number, row, column } = seat;
//       if (!seat_number || !row || !column) {
//         return res.status(400).json({ message: 'Seat number, row, and column are required for each seat' });
//       }
//     }

//     try {
//       // Thêm nhiều ghế vào phòng chiếu
//       const newSeats = await prisma.seat.createMany({
//         data: seats.map((seat) => ({
//           ...seat,
//           room_id: parseInt(room_id)
//         }))
//       });

//       return res.status(201).json({
//         message: `${newSeats.count} seats created successfully`,
//         newSeats
//       });
//     } catch (error) {
//       console.error('Error creating seats:', error);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//   };

createSeats = async (req, res) => {
    const { room_id } = req.params;  
  
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const vipRows = ['C', 'D', 'E', 'F', 'G']; 
    const totalColumns = 14;
  
    let seats = [];
  
    rows.forEach(row => {
      for (let column = 1; column <= totalColumns; column++) {
        seats.push({
          seat_number: `${row}${column}`,
          row: row,
          column: column,
          seat_type: vipRows.includes(row) ? 'VIP' : 'Regular',  // Ghế VIP nếu thuộc các hàng F, H, J
          room_id: parseInt(room_id)
        });
      }
    });
  
    try {
      // Thêm tất cả các ghế được tạo ra vào cơ sở dữ liệu
      const newSeats = await prisma.seat.createMany({
        data: seats
      });
  
      return res.status(201).json({
        message: `${newSeats.count} seats created successfully`,
        newSeats
      });
    } catch (error) {
      console.error('Error creating seats:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

  // Xóa một ghế theo id
  deleteSeat = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedSeat = await prisma.seat.delete({
        where: { id: parseInt(id) }
      });

      return res.status(200).json({
        message: 'Seat deleted successfully',
        deletedSeat
      });
    } catch (error) {
      console.error('Error deleting seat:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Cập nhật thông tin ghế
  updateSeat = async (req, res) => {
    const { room_id, id } = req.params; // Lấy room_id và id của ghế từ params
    const { seat_number, seat_type, row, column, showtime_id } = req.body;
  
    try {
      const updatedSeat = await prisma.seat.update({
        where: { 
          id: parseInt(id),
          room_id: parseInt(room_id) // Đảm bảo ghế thuộc đúng phòng
        },
        data: {
          seat_number,
          seat_type,
          row,
          column,
          showtime_id: showtime_id ? parseInt(showtime_id) : undefined, // Cập nhật showtime_id nếu có
        },
      });
  
      return res.status(200).json(updatedSeat);
    } catch (error) {
      console.error('Error updating seat:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  getSeatsByShowtimeAndRoom = async (req, res) => {
    const { room_id, showtime_id } = req.params;
  
    // Kiểm tra tính hợp lệ của room_id và showtime_id
    if (!room_id || isNaN(room_id) || !showtime_id || isNaN(showtime_id)) {
        return res.status(400).json({ message: 'Invalid room_id or showtime_id' });
    }
  
    try {
        const seats = await prisma.seat.findMany({
            where: {
                room_id: parseInt(room_id),
                showtime_id: parseInt(showtime_id),
            },
            select: {
                id: true,
                seat_number: true,
                seat_type: true,
                row: true,
                column: true,
                status: true, 
                hold_until: true,
                is_paid: true,
            },
            orderBy: [
                { row: 'asc' },     // Sắp xếp theo hàng (A, B, C, ...)
                { column: 'asc' }   // Sắp xếp theo cột (1, 2, 3, ...)
            ]
        });
  
        // Kiểm tra nếu không tìm thấy ghế
        if (seats.length === 0) {
            return res.status(404).json({ message: 'No seats found for the specified room and showtime' });
        }
  
        return res.status(200).json(seats); // Trả về danh sách ghế đã sắp xếp
    } catch (error) {
        console.error('Error fetching seats with status for showtime:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  
 
  bookSeat = async (req, res) => {
    const { room_id, seat_id, showtime_id } = req.params;
    const { user_id } = req.body;

    const currentTime = new Date();
    const holdTime = new Date(currentTime.getTime() + 10 * 60 * 1000); // Giữ chỗ trong 10 phút

    try {
        // Kiểm tra ghế có tồn tại và thuộc phòng, suất chiếu đã chọn
        const seat = await prisma.seat.findFirst({
            where: {
                id: parseInt(seat_id),
                room_id: parseInt(room_id),
                showtime_id: parseInt(showtime_id), // Kiểm tra suất chiếu
            },
        });

        if (!seat) {
            return res.status(404).json({ message: 'Seat not found in this room for the selected showtime' });
        }

        // Kiểm tra nếu ghế đã được đặt
        if (seat.status !== 'available') {
            return res.status(400).json({ message: 'Seat is not available for booking' });
        }

        // Đặt ghế trong trạng thái "on-hold" cho suất chiếu đã chọn
        await prisma.seat.update({
            where: { id: parseInt(seat_id) },
            data: {
                status: 'on-hold',
                hold_until: holdTime,
                is_paid: false,
                showtime_id: parseInt(showtime_id), // Gắn suất chiếu vào ghế đã đặt
            },
        });

        return res.status(200).json({ message: 'Seat successfully put on hold for booking for the selected showtime.' });
    } catch (error) {
        console.error('Error booking seat:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  confirmPayment = async (req, res) => {
    const { room_id, seat_id } = req.params;
    const { user_id, showtime_id, promotion_id } = req.body;
    const currentTime = new Date();

    try {
        // Tìm ghế với điều kiện room_id và showtime_id để chắc chắn suất chiếu đúng
        const seat = await prisma.seat.findFirst({
            where: {
                id: parseInt(seat_id),
                room_id: parseInt(room_id),
                showtime_id: parseInt(showtime_id),
            },
        });

        if (!seat) {
            return res.status(404).json({ message: 'Seat not found in this room for the selected showtime' });
        }

        if (seat.status !== 'on-hold' || seat.is_paid) {
            return res.status(400).json({ message: 'Seat is not available for payment. It may already be paid or is no longer on hold.' });
        }

        if (seat.hold_until < currentTime) {
            return res.status(400).json({ message: 'Hold time for the seat has expired' });
        }

        
        await prisma.seat.update({
            where: { id: parseInt(seat_id) },
            data: {
                status: 'paid',
                is_paid: true,
                hold_until: null,
            },
        });

        // Tạo vé mới cho người dùng với thông tin suất chiếu và khuyến mãi
        const newTicket = await prisma.ticket.create({
            data: {
                user_id: parseInt(user_id),
                showtime_id: parseInt(showtime_id),
                seat_id: parseInt(seat_id),
                promotion_id: promotion_id ? parseInt(promotion_id) : null,
                status: 'paid',
            },
        });

        return res.status(200).json({
            message: 'Payment confirmed successfully, ticket created.',
            ticket: newTicket,
        });
    } catch (error) {
        console.error('Error confirming payment and creating ticket:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  confirmPaymentByQRCode = async (req, res) => {
    
    try {
      const { seat_id } = req.params; 
      const { user_id, showtime_id, promotion_id } = req.body;

      const seat = await prisma.seat.findFirst({
        where: { id: parseInt(seat_id), room_id: parseInt(room_id), showtime_id: parseInt(showtime_id) },
       
      });
      console.log('Seat Data:', seat);
      
  
      if (seat.status !== 'available') {
        return res.status(400).json({ message: 'Seat is not in an on-hold state.' });
      }
  
      if (seat.is_paid) {
        return res.status(400).json({ message: 'Seat is already paid.' });
      }
  
      // const currentTime = new Date();
      // if (seat.hold_until < currentTime) {
      //   return res.status(400).json({ message: 'Hold time for the seat has expired.' });
      // }

       const amountValue = seat.price;
       console.log("amount", amountValue)
       const existingTicket = await prisma.ticket.findFirst({
        where: {
          seat_id: parseInt(seat_id),
          showtime_id: parseInt(showtime_id),
        },
      });
  
      if (existingTicket) {
        return res.status(400).json({
          message: 'A ticket already exists for this seat and showtime.',
          ticket: existingTicket,
        });
      }
  

      await prisma.seat.update({
        where: { id: parseInt(seat_id) },
        data: { status: 'paid', is_paid: true, hold_until: null },
      });
  
     
      await prisma.seat.update({
        where: { id: parseInt(seat_id) },
        data: { status: 'paid', is_paid: true, hold_until: null },
      });
      console.log('Attempting to create ticket with the following data:', {
        user_id: parseInt(user_id),
        showtime_id: parseInt(showtime_id),
        seat_id: parseInt(seat_id),
        promotion_id: promotion_id ? parseInt(promotion_id) : null,
        status: 'paid',
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

  
   
      const bankCode = '970422'; 
      const accountNumber = '9190163130063'; 
      const template = 'Tp8VEQR'; 
      const addInfo = `Thanh toan ve ${newTicket.id}`; 
      const accountName = 'Lotte Cinema';
      const qrUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-${template}.jpg?amount=${amountValue}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(accountName)}`;
  
     
      
      // if (!qrResponse || !qrResponse.data) {
      //   return res.status(500).json({ message: 'Failed to generate QR code from VietQR' });
      // }
  
      
      // const qrCodeUrl = `data:image/jpeg;base64,${Buffer.from(qrResponse.data, 'binary').toString('base64')}`;
  
     
      return res.status(200).json({
        message: 'Payment confirmed, ticket created with QR code.',
        ticket: newTicket,
        qrUrl, 
      });
    } catch (error) {
      console.error('Error during payment process:', error.message);
      return res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
  };
  

}

module.exports = new SeatsController();
