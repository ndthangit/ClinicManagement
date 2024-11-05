const connection = require('../DB/database');

let addNewUser = async (req, res) => {
    console.log(req.body);
    // add new user to database
    const sql = `INSERT INTO dataIT3170.patient_account (user_name, password) VALUES (?, ?);`;
    const values = [req.body.CCCD, req.body.Password];
    try {
        connection.query(sql,values, (err, results) => {
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