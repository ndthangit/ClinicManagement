const express = require('express');
const router = express.Router();
const paymentController = require('../controller/Payment');

// Route để xử lý yêu cầu thanh toán
router.post('/checkout', paymentController.checkout);

module.exports = router;
