const { executeQueryID } = require('./Home');
const connection = require('../DB/database');

let loginUser = async (req, res) => {
    const sql = `SELECT user_name, patient_name FROM dataIT3170.patient_account join patients on patient_account.user_name = patients.cccd where user_name = ? and password = ?`;
    const values = [req.body.user_name, req.body.password];
    // console.log('values,', values);
    try {
        connection.query(sql,values, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Database query error');
            } else if (results.length === 0) {
                return res.status(404).json({message: 'connection failed'});
            } else {
                console.log('results', results);
                return res.status(200).json({message: 'connection success',patient_id: results[0].user_name, patient_name: results[0].patient_name});
            }
        });
    }
    catch (err) {
        console.error('Failed to add new user:', err);
    }
};

let getAccountInfo = async (req, res) => {
    const username = req.params.id;
    const sql = `SELECT * FROM dataIT3170.patient_account WHERE user_name = ? `;
    const result = await executeQueryID(sql, [username]);
    res.json(result[0]);
}

module.exports = {
    getAccountInfo: getAccountInfo,
    loginUser: loginUser,
};