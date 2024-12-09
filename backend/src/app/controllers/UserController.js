const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

class UserController {

  // GET thông tin người dùng
  async getUser(req, res) {
    const userId = req.user.userId;  // Lấy userId từ token (đã được gắn vào req.user)

    try {
      // Tìm người dùng với toàn bộ thông tin
      const user = await prisma.user.findUnique({
        where: { id: userId },
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

  // PUT cập nhật thông tin người dùng
  async updateUser(req, res) {
    const userId = req.user.userId;  // Lấy userId từ token (đã được gắn vào req.user)
    const { full_name, email, date_of_birth, phone_number } = req.body;

    // Xây dựng đối tượng data để cập nhật
    const updateData = {};

    if (full_name) updateData.full_name = full_name;
    if (email) updateData.email = email;
    if (date_of_birth) updateData.date_of_birth = new Date(date_of_birth);
    if (phone_number) updateData.phone_number = phone_number;

    try {
      if (email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: email },
        });

        if (existingUser && existingUser.id !== userId) {
          return res.status(400).json({ message: 'Email is already taken by another user.' });
        }
      }

      const user = await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });

      return res.status(200).json({ message: 'User information updated successfully', user });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // PUT thay đổi mật khẩu người dùng
  async changePassword(req, res) {
    const userId = req.user.userId;  
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'Current password, new password, and confirm password are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New password and confirm password must match' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
      });

      return res.status(200).json({ message: 'Password updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error changing password:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new UserController();
