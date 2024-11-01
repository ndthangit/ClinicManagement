const connection = require('../DB/database')

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


let getDoctors = async(req, res) => {
    const sql = 'SELECT * FROM dataIT3170.Doctors';
    const result = await executeQuery(sql); // Chờ kết quả truy vấn
    res.json(result);
};

let getDoctorById = async(req, res) => {
    const doctorId = req.params.id;
    const sql = `SELECT * FROM dataIT3170.Doctors D WHERE doctor_id = ? `;
    const result = await executeQuery(sql, [doctorId]);
    res.json(result[0]);
};

module.exports = {
    getDoctors: getDoctors,
    getDoctorById: getDoctorById
}