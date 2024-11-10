const connection = require('../DB/database')
const {executeQuery} = require('../controller/Home')

const getHistMedicalExam = async (req, res) => {

    const sql = `select * from datait3170.appointments, datait3170.patients 
        where datait3170.appointments.patient_id = datait3170.patients.patient_id`
        try {
            const data = await executeQuery(sql, res);
            res.send(data);
        } catch (err) {
            console.error('Failed to retrieve data:', err);
        }
}

module.exports = {getHistMedicalExam: getHistMedicalExam}