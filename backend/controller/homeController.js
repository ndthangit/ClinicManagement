const connection = require('../DB/database')
const jwt = require('jsonwebtoken');
const userService = require('../service/userService')
let getHomePage = async (req, res) => {
    try {
        connection.query('SELECT * FROM dataIT3170.Patients', (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send('Database query error');
            }
            return res.render('homepage.ejs', {
                data: JSON.stringify(results)
            });
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send('Server error');
    }
}

let handleLogin = async (req, res) => {
    if (!req.body.email|| !req.body.password) {
        return res.status(500).json({
            message: 'Missing input parameters: email and password are required'
        });
    }

    let user = await userService.handleLoginUser(req.body.email, req.body.password);
    if (user) {
        // Create a token
        let payload = { user: user.email };
        let options = { expiresIn: '2d' };
        // let secret = process.env.JWT_SECRET;
        // let token = jwt.sign(payload, secret, options);

        return res.status(200).json({
            message: 'ok',
            // jwt: token
        });

    } else {
        return res.status(500).json({
            message: 'Unauthenticated user'
        });
    }
}
let getLoginInformation = async (req, res) => {
    try {
        const sql = 'SELECT * FROM dataIT3170.Patients';
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send('Database query error');
            }
            // res.json(results);
            return res.status(200).json(results);

        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Server error'
        });
    }
}

module.exports = {
    getHomePage: getHomePage,
    handleLogin : handleLogin
};