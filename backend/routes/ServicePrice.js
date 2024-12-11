const express = require('express');
const router = express.Router();
const {DepartmentList,
    ServiceListByDepartmentId,
    DeleteDepartment,
    DeleteService,}=require('../controller/ServicePrice')

router.get('/',DepartmentList)
router.get('/:id',ServiceListByDepartmentId)
router.delete('/delete_department/:id', DeleteDepartment);
router.delete('/delete_service/:id', DeleteService);

module.exports=router