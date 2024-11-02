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

// Lấy lịch khám theo patientId
const getScheduleByPatientId = async (req, res) => {
    const patientId = req.params.patientId;  // Sử dụng patientId để đồng nhất với frontend
    const sql = `
        SELECT a.appointment_id, a.reason, a.appointment_date, a.status,
               d.doctor_name AS doctor_name, p.patient_name AS patient_name
        FROM datait3170.Appointments AS a
        JOIN datait3170.Doctors AS d ON a.doctor_id = d.doctor_id
        JOIN datait3170.Patients AS p ON a.patient_id = p.patient_id
        WHERE a.patient_id = ?
    `;
    try {
        const result = await executeQuery(sql, [patientId]);

        // Chuyển đổi giờ sang múi giờ VN
        result.forEach(appointment => {
            const date = new Date(appointment.appointment_date);
            date.setMinutes(date.getMinutes() + 7 * 60);
            appointment.appointment_date = date.toISOString().replace("T", " ").slice(0, 16);
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Thêm lịch khám
const createSchedule = async (req, res) => {
    const { patient_id, doctor_id, appointment_date, reason } = req.body;

    //kiểm tra xem reason có bỏ trống không?
    if (!reason || reason.trim() === '') {
        return res.status(400).json({ message: 'Nguyên nhân không được để trống.' })
    }

    // Kiểm tra lịch khám có trùng không?
    const checkSql = `
        SELECT COUNT(*) as count 
        FROM datait3170.Appointments 
        WHERE patient_id = ? AND doctor_id = ? AND appointment_date = ?`;
    try {
        const checkResult = await executeQuery(checkSql, [patient_id, doctor_id, appointment_date]);

        if (checkResult[0].count > 0) {
            return res.status(400).json({ message: 'Lịch khám đã tồn tại cho bác sĩ và ngày giờ này.' });
        }

        // Nếu không trùng, thêm lịch khám mới
        const sql = `
            INSERT INTO datait3170.Appointments (patient_id, doctor_id, appointment_date, reason, status) 
            VALUES (?, ?, ?, ?, 'pending')`;
        const result = await executeQuery(sql, [patient_id, doctor_id, appointment_date, reason]);
        res.json({ message: 'Đã thêm lịch khám thành công', appointment_id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xóa một lịch khám
const deleteSchedule = async (req, res) => {
    const appointmentId = req.params.id;
    const sql = 'DELETE FROM datait3170.Appointments WHERE appointment_id = ?';
    try {
        await executeQuery(sql, [appointmentId]);
        res.json({ message: 'Đã xóa lịch khám thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Chỉnh sửa lịch khám
const updateSchedule = async (req, res) => {
    const { appointment_id, patient_id, doctor_id, appointment_date, reason } = req.body;

    // Kiểm tra lịch khám có trùng không? (trừ lịch khám hiện tại)
    const checkSql = `
        SELECT COUNT(*) as count 
        FROM datait3170.Appointments 
        WHERE patient_id = ? AND doctor_id = ? AND appointment_date = ? AND appointment_id != ?`;
    try {
        const checkResult = await executeQuery(checkSql, [patient_id, doctor_id, appointment_date, appointment_id]);

        if (checkResult[0].count > 0) {
            return res.status(400).json({ message: 'Lịch khám đã tồn tại cho bác sĩ và ngày giờ này.' });
        }

        // Nếu không trùng, cập nhật lịch khám
        const sql = `
            UPDATE datait3170.Appointments 
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
