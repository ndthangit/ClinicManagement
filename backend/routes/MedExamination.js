const express = require('express');
const router = express.Router();
const MedicalExam = require('../controller/MedicalExam');

router.get('/medicalExam', async (req, res) => {
    await MedicalExam.getHistMedicalExam(req, res);
});

router.get('/medicalExam/byDoctor/:id', async (req, res) => {
    await MedicalExam.getHistMedicalExamForDoctor(req, res);
});

module.exports = router