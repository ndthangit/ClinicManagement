const express = require('express');
const router = express.Router();
const Schedule = require('../controller/Schedule');

// Lấy lịch khám theo ID bệnh nhân
router.get('/:patientId', async (req, res) => {
    await Schedule.getScheduleByPatientId(req, res);
});
  
// Thêm lịch khám
router.post('/', async (req, res) => {
    await Schedule.createSchedule(req, res);
});
  
// Xóa lịch khám
router.delete('/:id', async (req, res) => {
    await Schedule.deleteSchedule(req, res);
});
  
// Chỉnh sửa lịch khám
router.put('/patient-sche/:appointment_id', (req, res) => {
    Schedule.updateSchedule(req, res);
});

module.exports = router;
