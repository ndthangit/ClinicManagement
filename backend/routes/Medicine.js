const express = require('express');
const router = express.Router();
const Medicine = require('../controller/Medicine');

router.get('/', async (req, res) => {
  Medicine.getMedicines(req, res);
})

router.get('/invoices/ById/:id', async (req, res) => {
  Medicine.getInvoiceById(req, res);
})

router.post('/invoices/ById/:id', async (req, res) => {
  Medicine.postMedicineForExamId(req, res);
})

router.get('/byId/:id', async (req, res) => {
  Medicine.getMedicinesById(req, res);
});

router.post('/removeMedicine', async (req, res) => {
  Medicine.removeMedicine(req, res);
})

module.exports = router
