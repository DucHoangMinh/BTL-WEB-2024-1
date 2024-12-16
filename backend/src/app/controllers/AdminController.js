const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AdminController {
  // GET danh sách người dùng
  async getUsers(req, res) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          full_name: true,
          phone_number: true,
          role: true,
          created_at: true
        }
      });

      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }

      return res.status(200).json({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // GET thông tin người dùng theo ID
  async getUserById(req, res) {
    const { userId } = req.params;

    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        select: { 
          id: true,
          full_name: true,
          email: true,
          phone_number: true,
          date_of_birth: true,
          created_at: true,
          role: true
        }
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ user });
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
}

  // DELETE người dùng
  async deleteUser(req, res) {
    const { userId } = req.params;

    try {
      const deletedUser = await prisma.user.delete({
        where: { id: parseInt(userId) }
      });

      return res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getTicketsByUser(req, res) {
    const { userId } = req.params;

    try {
      // if (req.user.role !== 'admin') {
      //   return res.status(403).json({ message: 'Forbidden: You do not have the required permissions' });
      // }

      const tickets = await prisma.ticket.findMany({
        where: { user_id: parseInt(userId) },
        include: {
          Seat: true,
          Showtime: true,
          Promotion: true,
        }
      });

      if (tickets.length === 0) {
        return res.status(404).json({ message: 'No tickets found for this user' });
      }

      return res.status(200).json({ tickets });
    } catch (error) {
      console.error('Error fetching tickets:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new AdminController();
