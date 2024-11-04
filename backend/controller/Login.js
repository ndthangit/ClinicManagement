const { executeQueryID } = require('./Home');
const connection = require('../DB/database');

let loginUser = async (req, res) => {
    console.log(req.body);
    const sql = `SELECT account_id,password FROM dataIT3170.account where account_id = ? and password = ?`;
    const values = [req.body.account_id, req.body.password];
    console.log(values);
    try {
        connection.query(sql,values, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Database query error');
            } else if (results.length === 0) {
                return res.status(404).json({message: 'connection failed'});
            } else {
                return res.status(200).json({message: 'connection success',account_id: req.body.account_id});
            }
        });
    }
    catch (err) {
        console.error('Failed to add new user:', err);
    }
};

let getAccountInfo = async (req, res) => {
    const account_id = req.params.id;
    const sql = `SELECT * FROM dataIT3170.account WHERE account_id = ? `;
    const result = await executeQueryID(sql, [account_id]);
    res.json(result[0]);
}

module.exports = {
    getAccountInfo: getAccountInfo,
    loginUser: loginUser,
};