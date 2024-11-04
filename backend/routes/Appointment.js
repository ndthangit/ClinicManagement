const express = require('express');
const router = express.Router();
const Appointment = require('../controller/Appointment');

router.get('/idDoctor/:id', async (req, res) => {
  await Appointment.getScheduleForDocterByIdDoctor(req, res);
});

router.get('/schedule/idDoctor/:id', async (req, res) => {
  await Appointment.getScheduleForPatientByIdDoctor(req, res);
});

router.get('/', async (req, res) => {
  await Appointment.getSchedule(req, res);
});

router.post('/', async (req, res) => {
  await Appointment.postSchedule(req, res);
  
});

module.exports = router