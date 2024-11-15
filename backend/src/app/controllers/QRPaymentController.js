const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
class QRPaymentController {
    create = async (req, res) => {
        // Create a QR code for the payment
        console.log(req.body)
        console.log(req)
    }
}
module.exports = new QRPaymentController();