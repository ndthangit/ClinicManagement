const express = require('express');
const router = express.Router();
const {DepartmentList,
    ServiceListByDepartmentId,
    DeleteDepartment,
    DeleteService,
    InsertDepartment,
    UpdateDepartment,
    InsertService,
    UpdateService,}=require('../controller/ServicePrice')

router.get('/',DepartmentList)
router.get('/:id',ServiceListByDepartmentId)
router.delete('/delete_department/:id', DeleteDepartment);
router.delete('/delete_service/:id', DeleteService);

router.post('/add_department',InsertDepartment);
router.post('/add_service',InsertService);

router.put('/edit_department/:id',UpdateDepartment);
router.put('/edit_service/:id',UpdateService)
module.exports=router