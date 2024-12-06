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

router.post('/signup', Doctor.createUser);
router.post('/create-doctor', Doctor.createNewDoctor);
router.patch('/update-doctor', Doctor.updateDoctorInfo);
router.delete('/delete-doctor', Doctor.deleteDoctor);

module.exports = router