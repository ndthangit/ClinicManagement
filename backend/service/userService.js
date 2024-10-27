const connection = require('../DB/database')
const bcrypt = require('bcrypt');

const saltRounds = 10;

let isEmailUserExist = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await connection.User.findOne({ where: { email: userEmail } });

            if (!user) {
                //not found
                resolve(false)
            }

            //found a record
            resolve(true)
        } catch (e) {
            reject(e)
        }
    })
};

let hashUserPassword = (myPlaintextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) reject(err);
            bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        });
    });
}

let getUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await connection.User.findAll({ attributes: ['email', 'password'] });
            resolve(users);
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

let handleLoginUser = (userEmail, userPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let user = await connection.User.findOne({
            //     where: { email: userEmail }
            // })
            // After
            // let user = connection.query(
            //     'SELECT * FROM dataIT3170.Patients WHERE email = ?', [userEmail]
            // );

            if (!user) {
                resolve(false)
            }

            //checking user's password

            let result = await bcrypt.compare(userPassword, user.password);
            if (result) {
                //true
                resolve(user);
            } else {
                //result === false
                resolve(false);
            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    isEmailUserExist: isEmailUserExist,
    hashUserPassword: hashUserPassword,
    getUsers: getUsers,
    handleLoginUser: handleLoginUser,
}