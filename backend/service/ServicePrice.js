const connection =require( '../DB/database')
let getAllDepartment=async ()=>{
    const [results,fields]=await connection.query(`select * from department`)
    return results;
}

let getServiceByDepartmentId = async(req, res) => {
    const department_id = req.params.id;
    const [results,fields]=await connection.query(
        'SELECT * FROM services WHERE department_id = ?',
        [department_id]  
    );
    return results
};

module.exports ={
    getAllDepartment,getServiceByDepartmentId
}

