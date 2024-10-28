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

const getPatients = async (req, res) => {
    const sql = 'SELECT * FROM dataIT3170.Patients';
    try {
        const patients = await executeQuery(sql, res);
        res.send(patients);
    } catch (err) {
        console.error('Failed to retrieve patients:', err);
    }

}
const getDoctors = async (req, res) => {
    const sql = 'SELECT * FROM dataIT3170.Doctors';
    try {
        const doctors = await executeQuery(sql, res);
        res.send(doctors);
    } catch (err) {
        console.error('Failed to retrieve doctors:', err);
    }
};
const getAppointments = async (req, res) => {
    const sql = 'SELECT * FROM dataIT3170.Appointments';
    try {
        const appointments = await executeQuery(sql, res);
        res.send(appointments);
    } catch (err) {
        console.error('Failed to retrieve appointments:', err);
    }
};

const getMedicalRecords = async (req, res) => {
    const sql = 'SELECT * FROM dataIT3170.MedicalRecords';
    try {
        const records = await executeQuery(sql, res);
        res.send(records);
    } catch (err) {
        console.error('Failed to retrieve medical records:', err);
    }
};

const getPayments = async (req, res) => {
    const sql = 'SELECT * FROM dataIT3170.Payments';
    try {
        const payments = await executeQuery(sql, res);
        res.send(payments);
    } catch (err) {
        console.error('Failed to retrieve payments:', err);
    }
};

const getInvoices = async (req, res) => {
    const sql = 'SELECT * FROM dataIT3170.Invoices';
    try {
        const invoices = await executeQuery(sql, res);
        res.send(invoices);
    } catch (err) {
        console.error('Failed to retrieve invoices:', err);
    }
};

const getPrescriptions = async (req, res) => {
    const sql = 'SELECT * FROM dataIT3170.Prescriptions';
    try {
        const prescriptions = await executeQuery(sql, res);
        res.send(prescriptions);
    } catch (err) {
        console.error('Failed to retrieve prescriptions:', err);
    }
};

const getMedicineInventory = async (req, res) => {
    const sql = 'SELECT * FROM dataIT3170.MedicineInventory';
    try {
        const inventory = await executeQuery(sql, res);
        res.send(inventory);
    } catch (err) {
        console.error('Failed to retrieve medicine inventory:', err);
    }
};


module.exports = {
    getPatients: getPatients,
    getDoctors: getDoctors,
    getAppointments: getAppointments,
    getMedicalRecords: getMedicalRecords,
    getPayments: getPayments,
    getInvoices: getInvoices,
    getPrescriptions: getPrescriptions,
    getMedicineInventory: getMedicineInventory

};