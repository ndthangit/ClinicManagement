const express = require('express');
const router = express.Router();
const {MedicineList}=require('../controller/Medicine')
router.get('/',MedicineList)


module.exports=router 