const express = require('express');
const router = express.Router();
const MedicalExam = require('../controller/MedicalExam');

router.get('/medicalExam', async (req, res) => {
    await MedicalExam.getHistMedicalExam(req, res);
});

module.exports = router