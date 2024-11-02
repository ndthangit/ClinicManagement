const connection = require('../DB/database')
const { getScheduleForPatientByIdDoctor } = require('./Appointment');

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
//lấy lịch khám theo id bệnh nhân
const getScheduleByPatientId = async (req, res) => {
    const patientId = req.params.id;
    const sql = `
        SELECT a.appointment_id, a.reason, a.appointment_date, a.status,
               d.name AS doctor_name, p.name AS patient_name
        FROM dataIT3170.appointment AS a
        JOIN dataIT3170.doctor AS d ON a.doctor_id = d.doctor_id
        JOIN dataIT3170.patient AS p ON a.patient_id = p.patient_id
        WHERE a.patient_id = ?
    `;
    try {
        const result = await executeQuery(sql, [patientId]);
        
        //chuyển đổi giờ sang múi giờ VN
        result.forEach(appointment => {
            appointment.appointment_date = new Date(appointment.appointment_date);
            appointment.appointment_date.setMinutes(appointment.appointment_date.getMinutes() + 7 * 60); 
        });
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//thêm lịch khám
const createSchedule = async (req, res) => {
    const { patient_id, doctor_id, appointment_date, reason } = req.body;

    //kiểm tra lịch khám có trùng không?
    const checkSql = `
        SELECT COUNT(*) as count 
        FROM dataIT3170.appointments 
        WHERE patient_id = ? AND doctor_id = ? AND appointment_date = ?`;
    try {
        const checkResult = await executeQuery(checkSql, [patient_id, doctor_id, appointment_date]);

        if (checkResult[0].count > 0) {
            return res.status(400).json({ message: 'Lịch khám đã tồn tại cho bác sĩ và ngày giờ này.' });
        }

        //nếu không trùng, thêm lịch khám mới
        const sql = `
            INSERT INTO dataIT3170.appointments (patient_id, doctor_id, appointment_date, reason, status) 
            VALUES (?, ?, ?, ?, 'pending')`;
        const result = await executeQuery(sql, [patient_id, doctor_id, appointment_date, reason]);
        res.json({ message: 'Đã thêm lịch khám thành công', appointment_id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//xóa một lịch khám
const deleteSchedule = async (req, res) => {
    const appointmentId = req.params.id;
    const sql = 'DELETE FROM dataIT3170.appointments WHERE appointment_id = ?';
    try {
        await executeQuery(sql, [appointmentId]);
        res.json({ message: 'Đã xóa lịch khám thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//chỉnh sửa lịch khám
const updateSchedule = async (req, res) => {
    const { appointment_id, patient_id, doctor_id, appointment_date, reason } = req.body;

    //kiểm tra lịch khám có trùng không? (trừ lịch khám hiện tại)
    const checkSql = `
        SELECT COUNT(*) as count 
        FROM dataIT3170.appointments 
        WHERE patient_id = ? AND doctor_id = ? AND appointment_date = ? AND appointment_id != ?`;
    try {
        const checkResult = await executeQuery(checkSql, [patient_id, doctor_id, appointment_date, appointment_id]);

        if (checkResult[0].count > 0) {
            return res.status(400).json({ message: 'Lịch khám đã tồn tại cho bác sĩ và ngày giờ này.' });
        }

        // Nếu không trùng, cập nhật lịch khám
        const sql = `
            UPDATE dataIT3170.appointments 
            SET patient_id = ?, doctor_id = ?, appointment_date = ?, reason = ? 
            WHERE appointment_id = ?`;
        await executeQuery(sql, [patient_id, doctor_id, appointment_date, reason, appointment_id]);

        res.json({ message: 'Đã cập nhật lịch khám thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getScheduleByPatientId: getScheduleByPatientId,
    createSchedule: createSchedule,
    deleteSchedule: deleteSchedule,
    updateSchedule: updateSchedule
};

