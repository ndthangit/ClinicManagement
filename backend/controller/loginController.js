const connection = require('../DB/database');

let getLoginInformation = async (req, res) => {
    const sql = 'SELECT * FROM dataIT3170.Patients';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Database query error');
        }
        const loginInformation = results.map(patient => ({
            email: patient.email,
            password: patient.password
        }));
        res.send(loginInformation);

    });
}


module.exports = {
    getLoginInformation: getLoginInformation
}