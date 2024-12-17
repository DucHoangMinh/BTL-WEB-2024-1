const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();  

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET; 

class LoginController {
  postLogin = async (req, res) => {
    const { email, password } = req.body;
    // console.log('JWT_SECRET:', process.env.JWT_SECRET);
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '10d' });
      console.log('Generated Token:', token); 

      return res.status(200).json({
        message: 'Login successful',
        token,  
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

module.exports = new LoginController();
