const connection = require('../DB/database')

function executeQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
            if (err) {
                return reject(err); // Từ chối Promise nếu có lỗi
            }
            resolve(results); // Hoàn thành Promise với kết quả truy vấn
        });
    });
}


let getDoctors = async (req, res) => {
    const sql = 'SELECT D.*, T.type_name, DE.department_name FROM dataIT3170.doctors D JOIN dataIT3170.type_doctor T ON D.type_id = T.type_id JOIN dataIT3170.department DE ON DE.department_id = D.department_id';
    const result = await executeQuery(sql); // Chờ kết quả truy vấn
    res.json(result);
};

let getDoctorById = async (req, res) => {
    const doctorId = req.params.id;
    const sql = `SELECT D.*, T.type_name, DE.department_name
                 FROM dataIT3170.doctors D
                          JOIN dataIT3170.type_doctor T ON D.type_id = T.type_id
                          JOIN dataIT3170.department DE ON DE.department_id = D.department_id
                 WHERE D.doctor_id = ? `;
    const result = await executeQuery(sql, [doctorId]);
    res.json(result[0]);
};

let checkDoctorAvailability = async (req, res) => {
    const {doctor_id, appointment_date} = req.body;

    const sql = `
        SELECT COUNT(*) as count
        FROM dataIT3170.appointments
        WHERE doctor_id = ? AND appointment_date = ?`;

    try {
        const result = await executeQuery(sql, [doctor_id, appointment_date]);
        res.json({available: result[0].count === 0});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const loginUser = async (req, res) => {
  const sql = `SELECT DA.username, DA.password, D.doctor_name, D.doctor_id FROM dataIT3170.doctor_account DA JOIN dataIT3170.doctors D ON D.username = DA.username where DA.username = ? and DA.password = ? `;
    const values = [req.body.username, req.body.password];
    try {
        connection.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Database query error');
            } else if (results.length === 0) {
                return res.status(404).json({message: 'connection failed'});
            } else {
                return res.status(200).json({message: 'connection success',username: results[0].username, doctor_name: results[0].doctor_name, doctor_id: results[0].doctor_id});
            }
        });
    } catch (err) {
        console.error('Failed to add new user:', err);
    }
};

const getDoctorByUsername = async (req, res) => {

  const sql = 'SELECT doctor_id FROM dataIT3170.doctors WHERE username = ?';
  const result = await executeQuery(sql, [req.params.user]);
  if (result.length !== 0) {
    res.status(200).send(result[0]);
  }
  res.status(404);
}

const createUser = async (req, res) => {
    const sql = 'INSERT INTO dataIT3170.doctor_account (username, password) VALUES (?, ?)';
    const values = [req.body.username, req.body.password];
    try {
        connection.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Database query error');
            } else {
                return res.status(200).json({message: 'User created successfully'});
            }
        });
    } catch (err) {
        console.error('Failed to add new user:', err);
    }

    res.json(values);
};

const getDoctorTypes = async (req, res) => {
  const sql = 'SELECT * FROM dataIT3170.type_doctor';
  const result = await executeQuery(sql);
  console.log(1);
  if (result.length !== 0) {
    res.status(200).send(result);
  }
  res.status(404);
}

const getDepartments = async (req, res) => {
  const sql = 'SELECT * FROM dataIT3170.department';
  const result = await executeQuery(sql);
  if (result.length !== 0) {
    res.status(200).send(result);
  }
  res.status(404);
}

const createNewDoctor = async (req, res) => {
    console.log(req.body);
    const sql = 'INSERT INTO `dataIT3170`.doctors (doctor_name, department_id, type_id, phone, email, address, username) VALUES(?, ?, ?, ?, ?, ?, ?);'+
        'INSERT INTO `dataIT3170`.doctor_account (username, password) VALUES(?, ?);';
    const values = [req.body.doctorName, req.body.departmentId, req.body.typeId, req.body.phone, req.body.email, req.body.address, req.body.username,req.body.username, req.body.password];
    try {
        connection.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Database query error');
            } else {
                return res.status(200).json({message: 'Doctor created successfully'});
            }
        });
    } catch (err) {
        console.error('Failed to add new doctor:', err);
    }

    // res.json(values);
};

const updateDoctorInfo = async (req, res) => {
    console.log(req.body);
    const sql = 'UPDATE `dataIT3170`.doctors SET img = ?, doctor_name = ?, department_id = ?, type_id = ?, phone = ?, email = ?, address = ?, username = ? WHERE doctor_id = ?;'+'UPDATE `dataIT3170`.doctor_account SET password = ? WHERE username = ?';
    const values = [req.body.img,req.body.doctor_name, req.body.department_id, req.body.type_id, req.body.phone, req.body.email, req.body.address, req.body.username, req.body.doctor_id, req.body.password, req.body.username];
    try {
        connection.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Database query error');
            } else {
                return res.status(200).json({message: 'Doctor updated successfully'});
            }
        });
    } catch (err) {
        console.error('Failed to update doctor:', err);
    }

    // res.json(req.body);
};

const deleteDoctor = async (req, res) => {
    console.log("delete: ", req.params.id);

    const sql = 'delete from dataIT3170.doctors where doctor_id = ?;';
    const values = [req.params.id];

    try {
        connection.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Database query error');
            } else {
                return res.status(200).json({message: 'Doctor deleted successfully'});
            }
        });
    } catch (err) {
        console.error('Failed to delete doctor:', err);
    }
};


module.exports = {
    getDoctors: getDoctors,
    getDoctorById: getDoctorById,
    checkDoctorAvailability: checkDoctorAvailability,
    loginUser: loginUser,
    createUser: createUser,
    createNewDoctor: createNewDoctor,
    updateDoctorInfo: updateDoctorInfo,
    deleteDoctor: deleteDoctor,
    getDoctorByUsername: getDoctorByUsername,
    getDoctorTypes: getDoctorTypes,
    getDepartments: getDepartments
}

    
