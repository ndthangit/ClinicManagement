const connection = require('../DB/database');

function executeQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

let getAppointmentsByDoctorId = async (req, res) => {
    const { doctor_id } = req.params;

    const sql = `
        SELECT 
            a.*, 
            p.patient_name, 
            p.phone
        FROM 
            dataIT3170.Appointments a
        JOIN 
            dataIT3170.Patients p
        ON 
            a.patient_id = p.patient_id
        WHERE 
            a.doctor_id = ?
    `;
    try {
        const result = await executeQuery(sql, [doctor_id]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


let approveAppointment = async (req, res) => {
    const { appointment_id } = req.params;

    const updateAppointmentSql = `
        UPDATE dataIT3170.Appointments
        SET status = 'confirmed'
        WHERE appointment_id = ? AND status = 'pending'
    `;

    const insertMedicalExamSql = `
        INSERT INTO dataIT3170.Medical_Exam (appointment_id, exam_date, symptoms, diagnosis, notes)
        SELECT appointment_id, appointment_date, '', '', ''
        FROM dataIT3170.Appointments
        WHERE appointment_id = ?
    `;

    try {
        const result = await executeQuery(updateAppointmentSql, [appointment_id]);

        if (result.affectedRows > 0) {
            await executeQuery(insertMedicalExamSql, [appointment_id]);
            
            res.status(200).json({ message: 'Lịch khám đã được duyệt và medical_exam đã được thêm' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy lịch cần duyệt hoặc không hợp lệ' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

let cancelAppointment = async (req, res) => {
    const { appointment_id } = req.params;

    const sql = `
        UPDATE dataIT3170.Appointments
        SET status = 'canceled'
        WHERE appointment_id = ? AND status = 'pending'
    `;
    try {
        const result = await executeQuery(sql, [appointment_id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Lịch khám đã được hủy' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy lịch cần hủy hoặc không hợp lệ' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

let cancelOutdatedPendingAppointments = async (req, res) => {
    const { doctor_id } = req.params;

    const sql = `
        UPDATE dataIT3170.Appointments 
        SET status = 'canceled' 
        WHERE doctor_id = ? AND status = 'pending' AND appointment_date < CURDATE()
    `;
    try {
        const result = await executeQuery(sql, [doctor_id]);
        res.status(200).json({ message: 'Hủy lịch quá ngày hẹn', affectedRows: result.affectedRows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAppointmentsByDoctorId,
    approveAppointment,
    cancelAppointment,
    cancelOutdatedPendingAppointments
}