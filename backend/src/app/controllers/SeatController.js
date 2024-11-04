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
    const { id } = req.params;
    const { seat_number, seat_type, row, column } = req.body;

    try {
      const updatedSeat = await prisma.seat.update({
        where: { id: parseInt(id) },
        data: {
          seat_number,
          seat_type,
          row,
          column
        }
      });

      return res.status(200).json(updatedSeat);
    } catch (error) {
      console.error('Error updating seat:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

module.exports = new SeatsController();
