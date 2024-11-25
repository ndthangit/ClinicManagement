const {executeQueryID, executeQuery} = require("./Home");

let confiUpdateStatusPayment = async (req, res) => {
    console.log(req.body);
    const sql = `update dataIT3170.payments set status = ? where payment_id = ?;`;
    const values = [req.body.status, req.body.paymentId];
    try {
        await executeQueryID(sql, values);
        res.send({message: 'updated successfully'});
    }
    catch (err) {
        console.error('Failed to add new user:', err);
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
let confiUpdateStatusAppointment = async (req, res) => {
    console.log(req.body);
    const sql = `update dataIT3170.appointments set status = ? where appointment_id = ?;`;
    const values = [req.body.status, req.body.appointmentId];
    try {
        await executeQueryID(sql, values);
        res.send({message: 'updated successfully'});
    }
    catch (err) {
        console.error('Failed to add new user:', err);
    }
};


module.exports = {
    confiUpdateStatusPayment: confiUpdateStatusPayment,
    getInfoAppointment: getInfoAppointment,
    confiUpdateStatusAppointment: confiUpdateStatusAppointment
}