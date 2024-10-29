const express = require('express')
const router = express.Router();
const { getDoctors } = require('../controller/Doctor')

router.get('/', async (req, res) => {
  await getDoctors(req, res);
});

module.exports = router