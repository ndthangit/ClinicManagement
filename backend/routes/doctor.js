const express = require('express');
const router = express.Router();
const Doctor = require('../controller/Doctor');

router.get('/', async (req, res) => {
  await Doctor.getDoctors(req, res);
});

router.get('/:id', async (req, res) => {
  await Doctor.getDoctorById(req, res);
});

router.post('/check-availability', async (req, res) => {
  await Doctor.checkDoctorAvailability(req, res);
});

router.post('/login', async (req, res) => {
  await Doctor.loginUser(req, res);
});

router.post('/signup', async (req, res) => {
  await Doctor.createUser(req, res);
});


module.exports = router