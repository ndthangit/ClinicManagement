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
  const sql = 'SELECT * FROM datait3170.Doctors';
  const result = await executeQuery(sql); // Chờ kết quả truy vấn
  res.json(result);
};

let getDoctorById = async(req, res) => {
  const doctorId = req.params.id;
  const sql = `SELECT * FROM datait3170.Doctors D WHERE doctor_id = ? `;
  const result = await executeQuery(sql, [doctorId]);
  res.json(result[0]);
};

let checkDoctorAvailability = async (req, res) => {
  const { doctor_id, appointment_date } = req.body;

  const sql = `
      SELECT COUNT(*) as count 
      FROM datait3170.Appointments 
      WHERE doctor_id = ? AND appointment_date = ?`;

  try {
      const result = await executeQuery(sql, [doctor_id, appointment_date]);
      res.json({ available: result[0].count === 0 });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDoctors: getDoctors,
  getDoctorById: getDoctorById,
  checkDoctorAvailability: checkDoctorAvailability
}

