
const connection = require('../DB/database');

let addNewUser = async (req, res) => {
    const { email, password, name, date_of_birth, gender, phone, address, username } = req.body;
    const sql = `INSERT INTO dataIT3170.Patients (email, password, patient_name, date_of_birth, gender, phone, address, username, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
    connection.query(sql, [email, password, name, date_of_birth, gender, phone, address, username], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Database query error');
        }
        res.send('User added successfully');
    });
}


module.exports = {
    addNewUser: addNewUser
}