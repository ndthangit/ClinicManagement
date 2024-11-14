const {executeQueryID, executeQuery} = require("./Home");

let confiUpdateStatusPayment = async (req, res) => {
    const { payment_id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'Trạng thái không được để trống.' });
    }
    try
    {
        const sql = `
            UPDATE datait3170.Payments 
            SET status = ? 
            WHERE payment_id = ?`;
        await executeQueryID(sql, [status, payment_id]);
        res.json({ message: 'Cập nhật trạng thái thanh toán thành công' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
let getInfoAppointment = async (req, res) => {
    const sql = `select appointment_id,patient_name,doctor_name, appointment_date, status from appointments join dataIT3170.doctors d on d.doctor_id = appointments.doctor_id join dataIT3170.patients p on p.patient_id = appointments.patient_id;`;
    try {
        const data = await executeQuery(sql, res);
        res.send(data);
    } catch (err) {
        console.error('Failed to retrieve data:', err);
    }
}

module.exports = {
    confiUpdateStatusPayment: confiUpdateStatusPayment,
    getInfoAppointment: getInfoAppointment
}