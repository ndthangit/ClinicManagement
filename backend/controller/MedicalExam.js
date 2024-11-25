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
        where 
        datait3170.medical_exam.appointment_id = datait3170.appointments.appointment_id and
        datait3170.appointments.patient_id = datait3170.patients.patient_id
        `
        try {
            const data = await executeQuery(sql, res);
            res.send(data);
        } catch (err) {
            console.error('Failed to retrieve data:', err);
        }
}

const getListMedicalExamByCCCD = async (req, res) => {

    const sql = `SELECT * 
             FROM datait3170.medical_exam M
             JOIN datait3170.appointments A
                 ON M.appointment_id = A.appointment_id
             JOIN datait3170.patients P
                 ON P.patient_id = A.patient_id
            WHERE P.cccd = ?`;
        try {
            const data = await query(sql, req.params.id );
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
        A.doctor_id = ? AND A.appointment_date >= ?`;
    try {
        const today = new Date();
        const midnightToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const data = await query(sql, [req.params.id, midnightToday]);
        const result = await scheduleMedicalExam(data);
        res.status(200).send(result);
    } catch (err) {
        console.error('Failed to retrieve data:', err);
    }
}

const getHistoryExamForDoctor = async (req, res) => {
    const sql = `select M.*, A.*, P.patient_name from datait3170.medical_exam M, datait3170.appointments A, datait3170.patients P
        where A.patient_id = P.patient_id and 
        M.appointment_id = A.appointment_id and
        A.doctor_id = ? AND A.appointment_date <= ?`;
    try {
        const today = new Date();
        const midnightToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const data = await query(sql, [req.params.id, midnightToday]);
        const result = await scheduleMedicalExam(data);
        res.status(200).send(result);
    } catch (err) {
        console.error('Failed to retrieve data:', err);
    }
}

const getDetailMedicalExamForDoctor = async (req, res) => {
    const sql = `select M.*, A.*, P.* from datait3170.medical_exam M, datait3170.appointments A, datait3170.patients P
        where A.patient_id = P.patient_id and 
        M.appointment_id = A.appointment_id and
        M.exam_id = ?`;
    try {
        
        const data = await query(sql, [req.params.id]);
        res.status(200).send(data[0]);
    } catch (err) {
        console.error('Failed to retrieve data:', err);
    }
}

const updateMedicalExam = async (req, res) => {
    let fields = [];
    if (req.body.changeInfo === 'symptoms')  {
        fields.push(`symptoms = '${req.body.symptoms}'`);
    }
    else if (req.body.changeInfo === 'diagnosis') {
        fields.push(`diagnosis = '${req.body.diagnosis}'`);
    }
    else if (req.body.changeInfo === 'status') {
        fields.push(`status = '${req.body.status}'`);
    }
    const sql = `UPDATE dataIT3170.medical_exam SET ${fields.join(", ")} WHERE exam_id = ?`;
    try {
        const data = await query(sql, [req.params.id]);
        res.status(200).json(data);
    } catch (err) {
        console.error('Failed to retrieve data:', err);
    }
}

module.exports = {
    getHistMedicalExam: getHistMedicalExam,
    getListMedicalExamByCCCD: getListMedicalExamByCCCD,
    getHistMedicalExamForDoctor: getHistMedicalExamForDoctor,
    getDetailMedicalExamForDoctor: getDetailMedicalExamForDoctor,
    updateMedicalExam: updateMedicalExam,
    getHistoryExamForDoctor: getHistoryExamForDoctor
}