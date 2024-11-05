const express = require('express');
const router = express.Router();

const patientController = require('../controller/Patient')
router.get('/byId/:id', patientController.getPatientByID);
router.get('/byCCCD/:cccd', patientController.getPatientByCCCD);


module.exports = router;