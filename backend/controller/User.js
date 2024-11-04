const connection = require('../DB/database');

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

const getUserByID = async (req, res) => {
  const userId = req.params.id;
  const sql = `SELECT * FROM dataIT3170.Patients P WHERE patient_id = ? `;
  const result = await executeQuery(sql, [userId]);
  res.json(result[0]);
}



module.exports = {
  getUserByID: getUserByID,
}