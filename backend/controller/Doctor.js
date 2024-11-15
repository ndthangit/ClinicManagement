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

const loginUser = async (req, res) => {
  const sql = `SELECT DA.user_name, DA.password, D.doctor_name, D.doctor_id FROM dataIT3170.doctor_account DA JOIN dataIT3170.doctors D ON D.user_name = DA.user_name where DA.user_name = ? and DA.password = ? `;
    const values = [req.body.user_name, req.body.password];
    try {
        connection.query(sql,values, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Database query error');
            } else if (results.length === 0) {
                return res.status(404).json({message: 'connection failed'});
            } else {
                return res.status(200).json({message: 'connection success',user_name: results[0].user_name, doctor_name: results[0].doctor_name, doctor_id: results[0].doctor_id});
            }
        });
    }
    catch (err) {
        console.error('Failed to add new user:', err);
    }
};

const getDoctorByUsername = async (req, res) => {

  const sql = 'SELECT doctor_id FROM dataIT3170.doctors WHERE user_name = ?';
  const result = await executeQuery(sql, [req.params.user]);
  if (result.length !== 0) {
    res.status(200).send(result[0]);
  }
}

const createUser = async (req, res) => {
  const info = req.body
  const sql = 'INSERT INTO dataIT3170.doctor_account (user_name, password) VALUES (?, ?)';
  connection.query(sql, [info.user_name, info.password]);
  res.json(info);
};


module.exports = {
  getDoctors: getDoctors,
  getDoctorById: getDoctorById,
  checkDoctorAvailability: checkDoctorAvailability,
  loginUser: loginUser,
  createUser: createUser,
  getDoctorByUsername: getDoctorByUsername
}

