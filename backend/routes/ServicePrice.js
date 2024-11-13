const express = require('express');
const router = express.Router();
const { DepartmentList,ServiceListByDepartmentId,}=require('../controller/ServicePrice')

router.get('/',DepartmentList)
router.get('/:id',ServiceListByDepartmentId)
module.exports=router