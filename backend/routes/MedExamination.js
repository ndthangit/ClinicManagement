const express = require('express');
const router = express.Router();
const MedicalExam = require('../controller/MedicalExam');

router.get('/medicalExam', async (req, res) => {
    await MedicalExam.getHistMedicalExam(req, res);
});

router.get('/medicalExam/byCCCD/:id', async (req, res) => {
    await MedicalExam.getListMedicalExamByCCCD(req, res);
});
// Lấy dữ liệu cho lịch sử khám phía bệnh nhân ------Begin----
router.get('/medicalExam/byIDPatient/:id', async (req, res) => {
    await MedicalExam.getListMedicalExamByIDcustomed(req, res);
});

// ---------------------------End---------------------

router.get('/medicalExam/byDoctor/:id', async (req, res) => {
    await MedicalExam.getHistMedicalExamForDoctor(req, res);
});

router.get('/medicalExam/byId/:id', async (req, res) => {
    await MedicalExam.getDetailMedicalExamForDoctor(req, res);
});

router.post('/medicalExam/byId/:id', async (req, res) => {
    await MedicalExam.updateMedicalExam(req, res);
});

router.get('/historyExam/byId/:id', async (req, res) => {
    await MedicalExam.getHistoryExamForDoctor(req, res)
});

module.exports = router