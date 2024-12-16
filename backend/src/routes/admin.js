const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/prismaAuthMiddleware');  // Middleware xác thực token chung
const authenticateAdmin = require('../middleware/authenticateAdmin');  // Middleware kiểm tra quyền admin
const AdminController = require('../app/controllers/AdminController');

// GET danh sách người dùng
router.get('/users', authenticateAdmin, AdminController.getUsers);

// GET thông tin người dùng theo ID
router.get('/users/:userId', authenticateAdmin, AdminController.getUserById);

// DELETE người dùng
router.delete('/users/:userId', authenticateAdmin, AdminController.deleteUser);

// GET danh sách vé đã đặt của một user
router.get('/users/tickets/:userId', AdminController.getTicketsByUser);

module.exports = router;
