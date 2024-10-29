const connection = require('../DB/database')

function executeQuery(sql) {
  return new Promise((resolve, reject) => {
      connection.query(sql, (err, results) => {
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

module.exports = {
  getDoctors: getDoctors,
}

