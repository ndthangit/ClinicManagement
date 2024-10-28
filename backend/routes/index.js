var express = require('express');
var router = express.Router();
var homeController = require('../controller/homeController')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("  express");
});

router.get('/patients', homeController.getPatients);
router.get('/doctors', homeController.getDoctors);
router.get('/appointments', homeController.getAppointments);
router.get('/medicalRecords', homeController.getMedicalRecords);
router.get('/payments', homeController.getPayments);
router.get('/invoices', homeController.getInvoices);
router.get('/prescriptions', homeController.getPrescriptions);
router.get('/medicineInventory', homeController.getMedicineInventory);



module.exports = router;
