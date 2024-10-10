const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

class RegisterController {
    postRegister = async (req, res) => {
      console.log('Received request body:', req.body); 
  
      const { firstName, lastName, email, password, confirmPassword, dateOfBirth } = req.body;
      // Kiem tra cac truong
      if (!firstName || !lastName || !email || !password || !confirmPassword || !dateOfBirth) {
        console.log("Missing required fields");
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      if (password !== confirmPassword) {
        console.log("Passwords do not match");
        return res.status(400).json({ message: 'Passwords do not match' });
      }
  
      try {
        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) {
          console.log("User already exists");
          return res.status(400).json({ message: 'User already exists' });
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newUser = await prisma.user.create({
          data: {
            full_name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
            date_of_birth: new Date(dateOfBirth),
          },
        });
  
        res.status(201).json({ message: 'User registered successfully', user: newUser });
      } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };
  }
  
  

module.exports = new RegisterController();
