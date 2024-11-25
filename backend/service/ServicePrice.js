const connection =require( '../DB/database')

function executeQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
            if (err) {
                return reject(err); // Từ chối Promise nếu có lỗi
            }
            resolve(results); // Hoàn thành Promise với kết quả truy vấn
        });
    });
  }

let getAllDepartment=async ()=>{
    const sql = 'select * from datait3170.department';
    try {
        const results = executeQuery(sql);
        return results;
    } catch (err) {
        console.error(err);
    }
    
}

let getServiceByDepartmentId = async(req, res) => {
    const sql = 'SELECT * FROM services WHERE department_id = ?'
    try {
        const results = executeQuery(sql, [req.params.id]);
        return results
    } catch (err) {
        console.error(err);
    }
};

module.exports ={
    getAllDepartment,getServiceByDepartmentId
}

