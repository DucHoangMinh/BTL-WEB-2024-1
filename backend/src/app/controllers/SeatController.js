const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class SeatsController {
  // Lấy danh sách tất cả các ghế trong một phòng chiếu
  getSeatsByRoom = async (req, res) => {
    const { room_id } = req.params;

    try {
      const seats = await prisma.seat.findMany({
        where: { room_id: parseInt(room_id) }
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
    const { room_id } = req.params;  // Lấy room_id từ URL
  
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const vipRows = ['F', 'H', 'J']; 
    const totalColumns = 16;
  
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

  // Lấy danh sách ghế với trạng thái cho một phòng và suất chiếu
  getSeatsByShowtimeAndRoom = async (req, res) => {
    const { room_id, showtime_id } = req.params;
  
    // Kiểm tra đầu vào
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
      });
  
      // Nếu không có ghế nào được tìm thấy
      if (seats.length === 0) {
        return res.status(404).json({ message: 'No seats found for the specified room and showtime' });
      }
  
      return res.status(200).json(seats);
    } catch (error) {
      console.error('Error fetching seats with status for showtime:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Đặt ghế cho người dùng
  bookSeat = async (req, res) => {
    const { room_id, seat_id } = req.params; // Lấy room_id và seat_id từ params
    const { user_id } = req.body; // Lấy user_id từ body để xác định ai đang đặt ghế
    const currentTime = new Date();
    const holdTime = new Date(currentTime.getTime() + 10 * 60 * 1000); // 10 phút giữ chỗ

    try {
      // Kiểm tra trạng thái ghế trong phòng chỉ định
      const seat = await prisma.seat.findUnique({
        where: { id: parseInt(seat_id) },
      });

      if (!seat || seat.room_id !== parseInt(room_id)) {
        return res.status(404).json({ message: 'Seat not found in this room' });
      }

      // Kiểm tra nếu ghế có sẵn
      if (seat.status !== 'available' || seat.is_paid || (seat.hold_until && seat.hold_until > currentTime)) {
        return res.status(400).json({ message: 'Seat is not available for booking.' });
      }

      // Cập nhật trạng thái giữ chỗ cho ghế
      await prisma.seat.update({
        where: { id: parseInt(seat_id) },
        data: {
          status: 'on-hold',
          hold_until: holdTime,
        },
      });

      return res.status(200).json({ message: 'Seat successfully put on hold for booking.' });
    } catch (error) {
      console.error('Error booking seat:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  // Xác nhận thanh toán cho ghế và tạo vé
  confirmPayment = async (req, res) => {
    const { room_id, seat_id } = req.params;
    const { user_id, showtime_id, promotion_id } = req.body;
    const currentTime = new Date();

    try {
      // Lấy thông tin ghế và kiểm tra trạng thái trong phòng chỉ định
      const seat = await prisma.seat.findUnique({
        where: { id: parseInt(seat_id) },
      });

      if (!seat || seat.room_id !== parseInt(room_id)) {
        return res.status(404).json({ message: 'Seat not found in this room' });
      }

      // Kiểm tra nếu ghế vẫn còn thời gian giữ chỗ và chưa thanh toán
      if (seat.status !== 'on-hold' || seat.is_paid || seat.hold_until < currentTime) {
        return res.status(400).json({ message: 'Seat cannot be confirmed for payment. Either it is already paid or hold time has expired.' });
      }

      // Cập nhật trạng thái đã thanh toán cho ghế
      await prisma.seat.update({
        where: { id: parseInt(seat_id) },
        data: {
          status: 'paid',
          is_paid: true,
          hold_until: null,
        },
      });

      // Tạo vé cho ghế đã thanh toán
      const newTicket = await prisma.ticket.create({
        data: {
          user_id: user_id,
          showtime_id: showtime_id,
          seat_id: seat_id,
          promotion_id: promotion_id || null, // Nếu không có promotion, đặt null
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

 
}

module.exports = new SeatsController();
