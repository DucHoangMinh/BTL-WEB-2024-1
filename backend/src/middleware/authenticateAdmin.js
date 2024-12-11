const jwt = require('jsonwebtoken');
require('dotenv').config();  

const JWT_SECRET = process.env.JWT_SECRET;  

// Middleware kiểm tra xem user có phải là admin không
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Kiểm tra xem role có phải là admin không
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden, you are not an admin' });
    }

    req.user = user;  
    next();
  });
};

module.exports = authenticateAdmin;
