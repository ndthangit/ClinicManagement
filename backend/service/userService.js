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
}





module.exports = {
    executeQuery: executeQuery
}