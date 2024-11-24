const express = require('express');
const router = express.Router();
const DoctorApm = require('../controller/DoctorApm');

router.get('/appointments/:doctor_id', DoctorApm.getAppointmentsByDoctorId);
router.put('/appointments/approve/:appointment_id', DoctorApm.approveAppointment);
router.put('/appointments/canceled/:appointment_id', DoctorApm.cancelAppointment);
router.put('/appointments/cancel-outdated/:doctor_id', DoctorApm.cancelOutdatedPendingAppointments);

module.exports = router;