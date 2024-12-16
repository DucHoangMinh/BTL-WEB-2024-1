const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  // log: ['query', 'info', 'warn', 'error']
});
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
  
        return res.status(200).json(seats); 
    } catch (error) {
        console.error('Error fetching seats with status for showtime:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  
 
  bookSeat = async (req, res) => {
    const { room_id, seat_ids, showtime_id } = req.params;
    console.log('Room ID:', room_id);
    console.log('Seat IDs:', seat_ids);  
    console.log('Showtime ID:', showtime_id);

    const seatIdsArray = seat_ids.split(',').map(id => parseInt(id, 10));
    console.log('Parsed Seat IDs:', seatIdsArray);

    const user_id = req.user.userId;  
    console.log('Decoded userId:', user_id);

    const currentTime = new Date();
    const holdTime = new Date(currentTime.getTime() + 10 * 60 * 1000);  

    try {
        const seats = await prisma.seat.findMany({
            where: {
                id: { in: seatIdsArray }, 
                room_id: parseInt(room_id), 
                showtime_id: parseInt(showtime_id),  
            },
        });

        if (seats.length === 0) {
            return res.status(404).json({ message: 'Seats not found for the selected room and showtime' });
        }

        const unavailableSeats = seats.filter(seat => seat.status !== 'available');
        const availableSeats = seats.filter(seat => seat.status === 'available');

        if (unavailableSeats.length > 0) {
            return res.status(400).json({
                message: 'Some seats are not available for booking',
                unavailableSeats: unavailableSeats.map(seat => seat.id), 
            });
        }

        const updatedSeats = await prisma.seat.updateMany({
            where: {
                id: { in: seatIdsArray },  
            },
            data: {
                status: 'on-hold',
                hold_until: holdTime,
                is_paid: false,
                showtime_id: parseInt(showtime_id),
            },
        });

        return res.status(200).json({
            message: 'Seats successfully put on hold for the selected showtime.',
            updatedSeats: updatedSeats,
        });

    } catch (error) {
        console.error('Error booking seats:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  confirmPayment = async (req, res) => {
    const { room_id } = req.params;
    const { seat_showtime_pairs, user_id } = req.body; // seat_showtime_pairs là mảng chứa seat_id và showtime_id
    const currentTime = new Date();
  
    try {
      if (!Array.isArray(seat_showtime_pairs) || seat_showtime_pairs.length === 0) {
        return res.status(400).json({ message: 'Danh sách ghế và suất chiếu không được để trống.' });
      }
  
      // Tách danh sách seat_id và showtime_id để truy vấn
      const seatIds = seat_showtime_pairs.map((pair) => pair.seat_id);
      const showtimeIds = seat_showtime_pairs.map((pair) => pair.showtime_id);
  
      // Truy vấn tất cả ghế với điều kiện room_id, seat_ids và showtime_ids
      const seats = await prisma.seat.findMany({
        where: {
          id: { in: seatIds.map((id) => parseInt(id)) },
          room_id: parseInt(room_id),
          showtime_id: { in: showtimeIds.map((id) => parseInt(id)) },
        },
      });
  
      // Kiểm tra nếu số lượng ghế trả về không khớp
      if (seats.length !== seat_showtime_pairs.length) {
        return res.status(404).json({
          message: 'Một số ghế không tồn tại trong phòng này cho các suất chiếu được chọn.',
        });
      }
  
      // Kiểm tra trạng thái của tất cả ghế
      const invalidSeats = seats.filter(
        (seat) =>
          seat.status !== 'on-hold' || seat.is_paid || new Date(seat.hold_until) < currentTime
      );
  
      if (invalidSeats.length > 0) {
        return res.status(400).json({
          message: 'Một số ghế không khả dụng để thanh toán.',
          invalidSeats: invalidSeats.map((seat) => ({
            ghế: seat.id,
            suất_chiếu: seat.showtime_id,
            trạng_thái: seat.status,
            đã_thanh_toán: seat.is_paid,
            giữ_chỗ_đến: seat.hold_until,
          })),
        });
      }
  
      // Cập nhật trạng thái của tất cả ghế thành 'paid'
      const updatedSeats = await prisma.seat.updateMany({
        where: {
          id: { in: seatIds.map((id) => parseInt(id)) },
          room_id: parseInt(room_id),
          showtime_id: { in: showtimeIds.map((id) => parseInt(id)) },
        },
        data: {
          status: 'paid',
          is_paid: true,
          hold_until: null,
        },
      });
  
      // Tạo vé cho tất cả ghế
      const tickets = await Promise.all(
        seat_showtime_pairs.map((pair) =>
          prisma.ticket.create({
            data: {
              user_id: parseInt(user_id),
              showtime_id: parseInt(pair.showtime_id),
              seat_id: parseInt(pair.seat_id),
              status: 'paid',
            },
          })
        )
      );
  
      return res.status(200).json({
        message: 'Thanh toán thành công, vé đã được tạo.',
        vé: tickets,
        ghế_đã_cập_nhật: {
          tổng_số: updatedSeats.count,
        },
      });
    } catch (error) {
      console.error('Lỗi trong quá trình xác nhận thanh toán và tạo vé:', error.message);
      return res.status(500).json({ message: 'Lỗi máy chủ nội bộ.', chi_tiết: error.message });
    }
  };
  confirmPaymentByQRCode = async (req, res) => {
    try {
      const { seat_ids, user_id, room_id, showtime_id } = req.body;
  
      if (!Array.isArray(seat_ids) || seat_ids.length === 0) {
        return res.status(400).json({ message: 'Seat IDs must be a non-empty array.' });
      }
  
      if (!user_id || !room_id || !showtime_id) {
        return res.status(400).json({ message: 'user_id, room_id, and showtime_id are required.' });
      }
  
      const errors = []; // Lưu lỗi nếu có
      let totalAmount = 0; // Tổng tiền
  
      for (const seat_id of seat_ids) {
        try {
          // Tìm ghế trong hệ thống
          const seat = await prisma.seat.findFirst({
            where: {
              id: parseInt(seat_id),
              room_id: parseInt(room_id),
              showtime_id: parseInt(showtime_id),
            },
            select: {
              id: true,
              price: true, // Lấy giá của ghế
              status: true,
              is_paid: true,
            },
          });
  
          if (!seat) {
            errors.push({ seat_id, message: 'Seat not found.' });
            break; // Nếu không tìm thấy ghế, thoát vòng lặp
          }
  
          // Kiểm tra nếu trạng thái ghế không phải 'on-hold'
          if (seat.status !== 'on-hold') {
            errors.push({ seat_id, message: 'Seat is not in an on-hold state.' });
            break; // Nếu ghế không phải on-hold, thoát vòng lặp
          }
  
          if (seat.is_paid) {
            errors.push({ seat_id, message: 'Seat is already paid.' });
            break; // Nếu ghế đã thanh toán, thoát vòng lặp
          }
  
          // Cộng giá ghế vào tổng tiền
          totalAmount += seat.price;
        } catch (error) {
          console.error(`Error processing seat ID ${seat_id}:`, error.message);
          errors.push({ seat_id, message: error.message });
          break; // Nếu xảy ra lỗi, thoát vòng lặp
        }
      }
  
      // Nếu có lỗi, trả về danh sách lỗi và không tạo mã QR
      if (errors.length > 0) {
        return res.status(400).json({
          message: 'Some seats are invalid for generating QR code.',
          errors,
        });
      }
  
      // Tạo QR code thanh toán
      const bankCode = '970422';
      const accountNumber = '9190163130063';
      const template = 'Tp8VEQR';
      const addInfo = `Thanh toan cho cac ghe ${seat_ids.join(', ')}`;
      const accountName = 'Lotte Cinema';

      // const addInfo = `Xac nhan thanh toan ghe ${seat_ids.join(', ')}, tong tien ${totalAmount} VND`;
      const qrUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-${template}.jpg?amount=${totalAmount}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(accountName)}`;
  
      // Trả về kết quả
      return res.status(200).json({
        message: 'QR code generated successfully.',
        addInfo,
        totalAmount, // Tổng tiền vé
        qrUrl, // URL mã QR
      });
    } catch (error) {
      console.error('Error during QR code generation:', error.message);
      return res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
  };
  
}

module.exports = new SeatsController();
