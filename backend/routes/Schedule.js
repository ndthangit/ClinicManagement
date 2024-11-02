const express = require('express');
const router = express.Router();
const Schedule = require('../controller/Schedule');

//lấy lịch khám theo ID bệnh nhân
router.get('/patient/:id', async (req, res) => {
    await Schedule.getScheduleByPatientId(req, res);
  });
  
  //thêm lịch khám
  router.post('/', async (req, res) => {
    await Schedule.createSchedule(req, res);
  });
  
  // Xóa lịch khám
  router.delete('/:id', async (req, res) => {
    await Schedule.deleteSchedule(req, res);
  });
  
  // Chỉnh sửa lịch khám
  router.put('/', async (req, res) => {
    await Schedule.updateSchedule(req, res);
  });
  
  module.exports = router;