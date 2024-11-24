const express = require('express');
const router = express.Router();
const Services = require('../controller/Services');

router.get('/', async (req, res) => {
  await Services.getService(req, res);
});

router.get('/byId/:id', async (req, res) => {
  await Services.getServiceById(req, res);
});

router.get('/serviceUseage/byId/:id', async (req, res) => {
  await Services.getServiceByExamId(req, res);
});

router.post('/serviceUseage/byId/:id', async (req, res) => {
  await Services.postServiceForExamId(req, res);
});

module.exports = router;
