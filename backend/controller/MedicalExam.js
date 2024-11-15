const connection = require('../DB/database')
const {executeQuery} = require('../controller/Home')

function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
            if (err) {
                return reject(err); // Từ chối Promise nếu có lỗi
            }
            resolve(results); // Hoàn thành Promise với kết quả truy vấn
        });
    });
  }

const getHistMedicalExam = async (req, res) => {

    const sql = `select * from datait3170.medical_exam, datait3170.appointments, datait3170.patients 
        where datait3170.appointments.patient_id = datait3170.patients.patient_id and 
        datait3170.medical_exam.appointment_id = datait3170.appointments.appointment_id`
        try {
            const data = await executeQuery(sql, res);
            res.send(data);
        } catch (err) {
            console.error('Failed to retrieve data:', err);
        }
}

const scheduleMedicalExam = async (data) => {
    const sto = {};
    data.map((value, index) => {
    const day = new Date(value.appointment_date);
        const date = day.toISOString().slice(0, 10);
        if (! (date in sto)) {
            sto[date] = [value];
        }
        else {
            sto[date].push(value);
        }

        
    });
    const res = Object.entries(sto)
    res.map(([key, value], index) => {
        value.sort((a, b) => {
          if (a.appointment_date < b.appointment_date) {
            return -1;  // a nhỏ hơn b, a sẽ đứng trước b
          }
          if (a.appointment_date > b.appointment_date) {
            return 1;   // a lớn hơn b, a sẽ đứng sau b
          }
          return 0;      // a và b bằng nhau, không thay đổi thứ tự
        });
      });
    res.sort()
    return res;
}

const getHistMedicalExamForDoctor = async (req, res) => {
    const sql = `select M.*, A.*, P.patient_name from datait3170.medical_exam M, datait3170.appointments A, datait3170.patients P
        where A.patient_id = P.patient_id and 
        M.appointment_id = A.appointment_id and
        A.doctor_id = ?`;
    try {
        const data = await query(sql, [req.params.id]);
        const result = await scheduleMedicalExam(data);
        res.status(200).send(result);
    } catch (err) {
        console.error('Failed to retrieve data:', err);
    }
}

module.exports = {
    getHistMedicalExam: getHistMedicalExam,
    getHistMedicalExamForDoctor: getHistMedicalExamForDoctor
}