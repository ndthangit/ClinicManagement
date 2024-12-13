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
  const sql = `SELECT * FROM dataIT3170.medicines`;
  try {
    const result = await executeQuery(sql);
    res.status(200).send(result);
  }
  catch (err) {
    console.error('Failed to send data:', err);
  }
}




  
const removeMedicine = async (req, res) => {
  const { id } = req.params; // Lấy medicine_id từ URL

  try {
    
    await executeQuery('DELETE FROM dataIT3170.invoices WHERE medicine_id = ?', [id])
    const deleteMedicineSql = 'DELETE FROM dataIT3170.medicines WHERE medicine_id = ?';
    const result = await executeQuery(deleteMedicineSql, [id]);

    if (result.affectedRows === 0) {
      // Nếu không tìm thấy bản ghi để xóa
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (err) {
    console.error('Failed to delete medicine:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const updateMedicine = async (req,res) => {
  const { id } = req.params; // Lấy medicine_id từ URL
  const { medicine_name, description, price, manufacturer } = req.body; // Lấy dữ liệu từ body

  // Kiểm tra dữ liệu bắt buộc
  if (!medicine_name || !description || !price || !manufacturer) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = `
      UPDATE dataIT3170.medicines 
      SET 
          medicine_name = ?, 
          description = ?, 
          price = ?, 
          manufacturer = ?
      WHERE medicine_id = ?;
  `;

  try {
    const result = await executeQuery(query, [medicine_name, description, price, manufacturer, id]);

    if (result.affectedRows === 0) {
      // Nếu không tìm thấy bản ghi để cập nhật
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json({ message: 'Medicine updated successfully' });
  } catch (err) {
    console.error('Failed to update medicine:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const generateCustomId = async () => {
  const sql = `SELECT MAX(medicine_id) as maxId FROM dataIT3170.medicines`;
  const result = await executeQuery(sql);
  const maxId = result[0]?.maxId || 0; // Lấy ID lớn nhất hiện tại hoặc 0 nếu không có dữ liệu
  const newId = maxId + 1; // Tăng ID
  return newId // Tạo ID với định dạng MED-001, MED-002...
};
const addMedicine = async (req, res) => {
  const { medicine_name, description, price, manufacturer } = req.body;

  if (!medicine_name || !description || !price || !manufacturer) {
    return res.status(400).json({ message: 'Tất cả các trường là bắt buộc!' });
  }

  try {
    const medicine_id = await generateCustomId(); // Sinh ID tùy chỉnh
    const sql = `
      INSERT INTO dataIT3170.medicines (medicine_id, medicine_name, description, price, manufacturer)
      VALUES (?, ?, ?, ?, ?)
    `;
    await executeQuery(sql, [medicine_id, medicine_name, description, price, manufacturer]);

    const newMedicine = {
      medicine_id,
      medicine_name,
      description,
      price,
      manufacturer
    };
    res.status(201).json(newMedicine);
  } catch (err) {
    console.error('Lỗi khi thêm thuốc:', err);
    res.status(500).json({ message: 'Lỗi server!' });
  }
};

module.exports = {
  getMedicines: getMedicines,
  removeMedicine: removeMedicine,
  updateMedicine:updateMedicine,
  addMedicine:addMedicine
}
