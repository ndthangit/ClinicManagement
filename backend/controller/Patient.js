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

const getPatientByID = async (req, res) => {
  const userId = req.params.id;
  const sql = `SELECT * FROM dataIT3170.Patients P WHERE patient_id = ? `;
  const result = await executeQuery(sql, [userId]);
  res.json(result[0]);
}

const getPatientByCCCD = async (req, res) => {
  const patientCCCD = req.params.cccd;
  const sql = `SELECT * FROM dataIT3170.Patients P WHERE cccd = ? `;
  const result = await executeQuery(sql, [patientCCCD]);
  res.json(result[0]);
}

const updatePatientInfo = async (req, res) => {
    console.log(req.body);
    const { patient_id, patient_name, date_of_birth, gender, phone, email, address } = req.body;
    let fields = [];
    let values = [];

    if (patient_name) {
        fields.push("patient_name = ?");
        values.push(patient_name);
    }
    if (date_of_birth) {
        fields.push("date_of_birth = ?");
        values.push(date_of_birth);
    }
    if (gender) {
        fields.push("gender = ?");
        values.push(gender);
    }
    if (phone) {
        fields.push("phone = ?");
        values.push(phone);
    }
    if (email) {
        fields.push("email = ?");
        values.push(email);
    }
    if (address) {
        fields.push("address = ?");
        values.push(address);
    }



    const sql = `
        UPDATE dataIT3170.patients
        SET ${fields.join(", ")}
        WHERE CCCD = ?
    `;

    try {
        const result = await executeQuery(sql, [...values, patient_id]);
        console.log(sql);
        res.json({ success: true, message: 'Patient information updated successfully', result });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error updating patient information', error: err });
    }
}


module.exports = {
  getPatientByID: getPatientByID,
  getPatientByCCCD: getPatientByCCCD,
    updatePatientInfo: updatePatientInfo
}