const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/prismaAuthMiddleware');  
const UserController = require('../app/controllers/UserController');

// GET thông tin người dùng 
router.get('/', authenticateToken, UserController.getUser);

// PUT cập nhật thông tin người dùng 
router.put('/', authenticateToken, UserController.updateUser);

// PUT thay đổi mật khẩu người dùng 
router.put('/change-password', authenticateToken, UserController.changePassword);

module.exports = router;
