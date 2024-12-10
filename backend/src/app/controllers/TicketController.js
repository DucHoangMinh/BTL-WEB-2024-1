const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TicketController {
  async getDetailedTicketsByUser(req, res) {
    const { user_id } = req.params;

    try {
      // Truy vấn danh sách vé từ user_id
      const tickets = await prisma.ticket.findMany({
        where: { user_id: parseInt(user_id) },
        select: {
          id: true, // ID của vé
          showtime_id: true, // ID của suất chiếu
          seat_id: true, // ID của ghế
          purchase_date: true, // Ngày mua vé
          status: true, // Trạng thái vé
          Showtime: {
            select: {
              start_time: true, // Giờ chiếu
              end_time: true, // Giờ kết thúc
            },
          },
          Seat: {
            select: {
              seat_number: true, // Số ghế
              row: true, // Hàng ghế
              column: true, // Cột ghế
              Room: {
                select: {
                  name: true, // Tên phòng chiếu
                },
              },
            },
          },
        },
      });

      if (tickets.length === 0) {
        return res.status(404).json({ message: 'No tickets found for the specified user.' });
      }

      // Trả về danh sách vé với thông tin chi tiết
      const detailedTickets = tickets.map(ticket => ({
        ticket_id: ticket.id,
        showtime: {
          id: ticket.showtime_id,
          start_time: ticket.Showtime.start_time,
          end_time: ticket.Showtime.end_time,
        },
        seat: {
          id: ticket.seat_id,
          seat_number: ticket.Seat.seat_number,
          row: ticket.Seat.row,
          column: ticket.Seat.column,
          room: ticket.Seat.Room.name,
        },
        purchase_date: ticket.purchase_date,
        status: ticket.status,
      }));

      return res.status(200).json({ tickets: detailedTickets });
    } catch (error) {
      console.error('Error fetching tickets for user:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new TicketController();
