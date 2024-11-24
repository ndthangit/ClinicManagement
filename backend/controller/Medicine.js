const connection = require('../DB/database');

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

const getMedicines = async (req, res) => {
  const sql = `SELECT * FROM datait3170.medicines`;
  try {
    const result = await executeQuery(sql);
    res.status(200).send(result);
  }
  catch (err) {
    console.error('Failed to send data:', err);
  }
}

const getMedicinesById = async (req, res) => {
  const sql1 = `SELECT * FROM datait3170.medicines`;
  const sql2 = `SELECT * FROM datait3170.invoices WHERE exam_id = ?`;
  try {
    const result = await executeQuery(sql1);
    const filter = await executeQuery(sql2, [req.params.id]);
    const filteredList = result.filter(
      (item) => !filter.some((hasUsed) => item.medicine_id === hasUsed.medicine_id)
    );
    res.status(200).send(filteredList);
  } catch(err) {
    console.error('Failed to send data:', err);
  }
}

const postMedicineForExamId = async (req, res) => {
  const sql = `INSERT INTO datait3170.invoices (exam_id, medicine_id, note, quantity) VALUES (?, ?, ?, ?)`;
  try {
    await executeQuery(sql, [req.params.id, req.body.medicine_id, req.body.note, req.body.quantity]);
    res.status(200).json({message: 'connection success', data: req.body});
  } catch(err) {
    console.error('Failed to send data:', err);
  }
}

const getInvoiceById = async (req, res) => {
  const sql = `SELECT * FROM datait3170.invoices I, datait3170.medicines M WHERE 
                I.medicine_id = M.medicine_id AND I.exam_id = ?
              `;
  try {
    const result = await executeQuery(sql, [req.params.id]);
    res.status(200).send(result);
  } catch(err) {
    console.error('Failed to send data:', err);
  }
}
  


module.exports = {
  getMedicines: getMedicines,
  getMedicinesById: getMedicinesById,
  postMedicineForExamId: postMedicineForExamId,
  getInvoiceById: getInvoiceById
}