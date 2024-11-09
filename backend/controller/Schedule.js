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
               a.doctor_id, d.doctor_name AS doctor_name, p.patient_name AS patient_name
        FROM datait3170.Appointments AS a
        JOIN datait3170.Doctors AS d ON a.doctor_id = d.doctor_id
        JOIN datait3170.Patients AS p ON a.patient_id = p.patient_id
        WHERE a.patient_id = ? AND a.status NOT IN ('canceled', 'completed')
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
    const checkStatusSql = 'SELECT status FROM datait3170.Appointments WHERE appointment_id = ?';
    const deleteSql = 'DELETE FROM datait3170.Appointments WHERE appointment_id = ?';
    const updateSql = 'UPDATE datait3170.Appointments SET status = ? WHERE appointment_id = ?';    
    
    try {
        const [appointment] = await executeQuery(checkStatusSql, [appointmentId]);
        if (!appointment) { return res.status(404).json({ error: 'Lịch khám không tồn tại'}); }
        
        if (appointment.status === 'pending') {
            await executeQuery(deleteSql, [appointmentId]);
            res.json({ message: 'Đã xóa lịch khám thành công' });
        } else if (appointment.status === 'confirmed') {
            await executeQuery(updateSql, ['canceled', appointmentId]);
            res.json({ message: 'Đã hủy lịch khám thành công' });
        } else {
            res.status(404).json({ message: 'Lịch khám không thể xóa hoặc hủy vì không ở trạng thái pending hoặc confirmed.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//chỉnh sửa lịch khám
const updateSchedule = async (req, res) => {
    const { appointment_id } = req.params;
    const { appointment_date, reason } = req.body;

    if (!appointment_date || !reason) {
        return res.status(400).json({ message: 'Ngày và lý do không được để trống.' });
    }

    //kiểm tra lịch khám có trùng không? (trừ lịch khám hiện tại)
    const checkSql = `
        SELECT COUNT(*) as count 
        FROM datait3170.Appointments 
        WHERE doctor_id = (SELECT doctor_id FROM datait3170.Appointments WHERE appointment_id = ?)
        AND appointment_date = ?
        AND appointment_id != ?`;
    try {
        const checkResult = await executeQuery(checkSql, [appointment_id, appointment_date, appointment_id]);

        if (checkResult[0].count > 0) {
            return res.status(400).json({ message: 'Lịch khám đã tồn tại cho bác sĩ và ngày giờ này.' });
        }

        //nếu không trùng, cập nhật lịch khám
        const sql = `
            UPDATE datait3170.Appointments 
            SET appointment_date = ?, reason = ? 
            WHERE appointment_id = ?`;
        await executeQuery(sql, [appointment_date, reason, appointment_id]);

        res.status(200).json({ message: 'Đã cập nhật lịch khám thành công' });
    } catch (error) {
        console.error("Lỗi khi cập nhật lịch khám:", error);
        res.status(500).json({ error: error.message });
    }
};

const getAvailableTimeSlotsByDoctor = async (req, res) => {
    const doctorId = req.params.doctorId;
    const selectedDate = req.query.date;

    const sql = `
        SELECT a.appointment_date 
        FROM datait3170.Appointments AS a
        WHERE a.doctor_id = ? AND a.status NOT IN ('canceled', 'completed')
        AND DATE(a.appointment_date) = ?
    `;

    try {
        const result = await executeQuery(sql, [doctorId, selectedDate]);

        const busyTimes = result.map(appointment => {
            const date = new Date(appointment.appointment_date);
            date.setHours(date.getHours() + 7);
            return date.toISOString().slice(11, 16); 
        });

        res.json({ busyTimes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getScheduleByPatientId: getScheduleByPatientId,
    createSchedule: createSchedule,
    deleteSchedule: deleteSchedule,
    updateSchedule: updateSchedule,
    getAvailableTimeSlotsByDoctor: getAvailableTimeSlotsByDoctor
};
