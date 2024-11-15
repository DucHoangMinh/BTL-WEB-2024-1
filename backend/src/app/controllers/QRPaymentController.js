
class QRPaymentController {
    async create(req, res) {
        // Create a QR code for the payment
        console.log(req.body)
        console.log(req)
    }
}
module.exports = new QRPaymentController();