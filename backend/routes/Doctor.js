const express = require('express');
const router = express.Router();
const Doctor = require('../controller/Doctor');

router.get('/', async (req, res) => {
  await Doctor.getDoctors(req, res);
});

router.get('/:id', async (req, res) => {
  await Doctor.getDoctorById(req, res);
});



module.exports = router