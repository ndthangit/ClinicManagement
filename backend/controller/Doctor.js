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
  const sql = 'SELECT D.*, T.type_name, DE.department_name FROM dataIT3170.Doctors D JOIN dataIT3170.type_doctor T ON D.type_id = T.type_id JOIN dataIT3170.department DE ON DE.department_id = D.department_id';
  const result = await executeQuery(sql); // Chờ kết quả truy vấn
  res.json(result);
};

let getDoctorById = async(req, res) => {
  const doctorId = req.params.id;
  const sql = `SELECT D.*, T.type_name, DE.department_name FROM dataIT3170.Doctors D JOIN dataIT3170.type_doctor T ON D.type_id = T.type_id JOIN dataIT3170.department DE ON DE.department_id = D.department_id WHERE D.doctor_id = ? `;
  const result = await executeQuery(sql, [doctorId]);
  res.json(result[0]);
};

module.exports = {
  getDoctors: getDoctors,
  getDoctorById: getDoctorById
}

