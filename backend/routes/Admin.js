const express = require('express');
const router = express.Router();
const Login = require('../controller/Login')
const Admin = require('../controller/Admin');

router.post('/login', Login.loginAdmin);
router.patch('/updateStatusPayment', Admin.confiUpdateStatusPayment);
router.patch('/updateStatusAppointment', Admin.confiUpdateStatusAppointment);
router.get('/checkAppointment', Admin.getInfoAppointment)
router.get('/checkDoctor', Admin.getInfoDoctor)

module.exports = router;