const express = require('express');
const router = express.Router();
const Medicine = require('../controller/Medicine');

router.get('/', async (req, res) => {
  Medicine.getMedicines(req, res);
})

router.delete('/removeMedicine/:id', async (req, res) => {
  Medicine.removeMedicine(req, res);
})
router.put("/editMedicine/:id",async (req, res) => {
  Medicine.updateMedicine(req,res);
})
router.post("/addMedicine/",async (req, res) => {
  Medicine.addMedicine(req,res);
})
module.exports = router
