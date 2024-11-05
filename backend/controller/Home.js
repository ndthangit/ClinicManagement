const connection = require('../DB/database')

let executeQuery = (sql, res) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Database query error');
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

function executeQueryID(sql, params = []) {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
            if (err) {
                return reject(err); // Từ chối Promise nếu có lỗi
            }
            resolve(results); // Hoàn thành Promise với kết quả truy vấn
        });
    });
}

const getDataFromDB = async function(req, res) {
    const {table} = req.params;
    const sql = `SELECT * FROM datait3170.${table}`;
    try {
        const data = await executeQuery(sql, res);
        res.send(data);
    } catch (err) {
        console.error('Failed to retrieve data:', err);
    }
}
module.exports = {
    executeQuery: executeQuery,
    executeQueryID: executeQueryID,
    getDataFromDB: getDataFromDB
};