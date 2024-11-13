const connection=require('../DB/database')
const {getAllDepartment,getServiceByDepartmentId}=require('../service/ServicePrice')
const DepartmentList=async  (req, res) => {
    let results=await getAllDepartment() //result o day la mang cac department
    res.json(results);
}
const ServiceListByDepartmentId=async  (req, res) => {
    let results=await getServiceByDepartmentId(req) //result o day la mang cac service theo department id
    res.json(results);
}

module.exports={
    DepartmentList,
    ServiceListByDepartmentId,
}