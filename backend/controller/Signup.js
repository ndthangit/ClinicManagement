const connection = require('../DB/database');

let addNewUser = async (req, res) => {
    console.log(req.body);
    // add new user to database
    const sql = `INSERT INTO datait3170.patients (patient_id, patient_name, date_of_birth, gender, phone, email, address, registration_date, username, password)
                VALUES (8, 'John Appleseed', '1980-01-01', 'male', '123456789', '${req.body.email}', '456 Elm St', '2024-01-15', '${req.body.username}', '${req.body.password}')`;    try {
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Database query error');
            } else {
                res.send(results);
            }
        });
    }
    catch (err) {
        console.error('Failed to add new user:', err);
    }
};

module.exports = {
    addNewUser: addNewUser
};