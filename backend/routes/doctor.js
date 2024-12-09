const express = require('express');
const router = express.Router();
const Doctor = require('../controller/Doctor');

router.get('/', async (req, res) => {
  await Doctor.getDoctors(req, res);
});

router.get('/byId/:id', async (req, res) => {
  await Doctor.getDoctorById(req, res);
});

router.post('/check-availability', async (req, res) => {
  await Doctor.checkDoctorAvailability(req, res);
});

router.get('/type', async (req, res) => {
  console.log(1)
  await Doctor.getDoctorTypes(req, res);
});

router.get('/departments', async (req, res) => {
  await Doctor.getDepartments(req, res);
});

router.post('/login', async (req, res) => {
  await Doctor.loginUser(req, res);
});

router.post('/signup', async (req, res) => {
  await Doctor.createUser(req, res);
});

router.get('/getIDbyUser/:user', async (req, res) => {
  await Doctor.getDoctorByUsername(req, res);
});




module.exports = router