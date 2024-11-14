const express = require('express');
const router = express.Router();
const Login = require('../controller/Login')
const Admin = require('../controller/Admin');

router.post('/login', Login.loginAdmin);
router.patch('/updateStatusPayment/:id', Admin.confiUpdateStatusPayment);
router.get('/checkAppointment', Admin.getInfoAppointment)

module.exports = router;