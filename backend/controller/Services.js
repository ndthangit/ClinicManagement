const connection = require('../DB/database');

function executeQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

const getServiceByExamId = async (req, res) => {
  const sql = `SELECT * FROM datait3170.service_usage SU, datait3170.services S 
  WHERE SU.service_id = S.service_id AND SU.exam_id = ?`;
  try {
    const result = await executeQuery(sql, [req.params.id]);
    res.status(200).send(result);
  } catch (err) {
    console.error('Failed to retrieve data:', err);
  }
};

const postServiceForExamId = async (req, res) => {
  const sql = `INSERT INTO datait3170.service_usage (exam_id, service_id, note) VALUES (?, ?, ?)`;

  try {
    await executeQuery(sql, [req.params.id, req.body.service_id, req.body.note]);
    res.status(200).json({message: 'connection success', data: req.body})
  } catch (err) {
    console.error('Failed to send data:', err);
  }
};

const getService = async (req, res) => {
  const sql = `SELECT * FROM datait3170.services`;
  try {
    const result = await executeQuery(sql);
    res.status(200).send(result);
  } catch (err) {
    console.error('Failed to send data:', err);
  }
}

const getServiceById = async (req, res) => {
  const sql1 = `SELECT * FROM datait3170.services`;
  const sql2 = `SELECT * FROM datait3170.service_usage WHERE exam_id = ?`
  try {
    const result = await executeQuery(sql1);
    const listHadUsed = await executeQuery(sql2, [req.params.id]);
    const filteredList = result.filter(
      (item) => !listHadUsed.some((hasUsed) => item.service_id === hasUsed.service_id)
    );
    res.status(200).send(filteredList);
  } catch (err) {
    console.error('Failed to send data:', err);
  }
}

const removeService  = async (req, res) => {
  const sql = 'DELETE FROM datait3170.service_usage WHERE exam_id = ? AND service_id = ?';
  try {
    console.log(req.body)
    await executeQuery(sql, [req.body.exam_id, req.body.service_id]);
    res.status(200).json(req.body)
  } catch (err) {
    console.error('Failed to send data:', err);
  }
}

module.exports = {
  getServiceByExamId: getServiceByExamId,
  postServiceForExamId: postServiceForExamId,
  getService: getService,
  getServiceById: getServiceById,
  removeService: removeService
};