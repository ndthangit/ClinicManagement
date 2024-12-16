const {executeQueryID, executeQuery} = require("./Home");
const connection = require('../DB/database')


let confiUpdateStatusPayment = async (req, res) => {
    console.log(req.body);
    const sql = `update dataIT3170.payments set status = ? where payment_id = ?;`;
    const values = [req.body.status, req.body.payment_id];
    try {
        await executeQueryID(sql, values);
        res.send({message: 'Payment updated status successfully'});
    }
    catch (err) {

        console.error('Failed to update status payment:', err);
        res.send({message: 'Failed to update status payment'});
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
    console.log("update status:",req.body);
    const sql = `update dataIT3170.appointments set status = ? where appointment_id = ?;`;
    const values = [req.body.status, req.body.appointment_id];
    try {
        connection.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(404).send('Database query error');
            } else {
                return res.status(200).json({message: 'status updated successfully'});
            }
        });
    } catch (err) {
        console.error('Failed to update status:', err);
    }
};

let getInfoDoctor = async (req, res) => {
    const sql = `SELECT * FROM dataIT3170.doctors left join dataIT3170.type_doctor td  on doctors.type_id = td.type_id left join dataIT3170.department d on doctors.department_id = d.department_id left join dataIT3170.doctor_account da on doctors.username = da.username;`;
    try {
        const data = await executeQuery(sql, res);
        res.send(data);
    } catch (err) {
        console.error('Failed to retrieve data:', err);
    }
}

module.exports = {
    confiUpdateStatusPayment: confiUpdateStatusPayment,
    getInfoAppointment: getInfoAppointment,
    confiUpdateStatusAppointment: confiUpdateStatusAppointment,
    getInfoDoctor: getInfoDoctor
}