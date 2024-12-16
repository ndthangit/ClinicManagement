import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/AdminNavbar';
import ServiceLeftbar from '../../components/leftbar/ServiceLeftbar';

function Medicine() {
  const [medicines, setMedicines] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    medicine_name: '',
    description: '',
    price: '',
    manufacturer: ''
  });
  const [newMedicine, setNewMedicine] = useState({
    medicine_name: '',
    description: '',
    price: '',
    manufacturer: ''
  }); // Trạng thái để thêm thuốc mới

  const navigate = useNavigate();

  // Lấy danh sách thuốc khi component được render lần đầu
  useEffect(() => {
    fetch('http://localhost:3005/medicine') 
      .then(response => response.json())
      .then(data => setMedicines(data))
      .catch(error => console.error('Lỗi khi lấy dữ liệu thuốc:', error));
  }, []);

  // Hàm xử lý xóa thuốc
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thuốc này không?')) {
      fetch(`http://localhost:3005/medicine/removeMedicine/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            setMedicines(medicines.filter(medicine => medicine.medicine_id !== id));
          } else {
            console.error('Lỗi khi xóa thuốc');
          }
        })
        .catch(error => console.error('Lỗi khi xóa thuốc:', error));
    }
  };

  // Hàm xử lý khi nhấn nút Sửa
  const handleEditClick = (medicine) => {
    setEditId(medicine.medicine_id);
    setEditFormData({
      medicine_name: medicine.medicine_name,
      description: medicine.description,
      price: medicine.price,
      manufacturer: medicine.manufacturer
    });
  };

  // Hàm xử lý thay đổi dữ liệu trong form sửa
  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Hàm xử lý lưu dữ liệu đã sửa
  const handleUpdate = (id) => {
    fetch(`http://localhost:3005/medicine/editMedicine/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
    })
        .then(response => response.json())
        .then(updatedMedicine => {
            // Cập nhật danh sách thuốc ngay lập tức
            setMedicines((prevMedicines) => prevMedicines.map(medicine =>
                medicine.medicine_id === id ? { ...medicine, ...editFormData } : medicine
            ));
            setEditId(null); // Đặt lại chế độ chỉnh sửa
        })
        .catch(error => console.error('Lỗi khi cập nhật thuốc:', error));
};

  // Hàm xử lý hủy bỏ sửa
  const handleCancel = () => {
    setEditId(null);
  };

  // Hàm xử lý thêm thuốc
  const handleAddMedicine = () => {
    fetch('http://localhost:3005/medicine/addMedicine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMedicine),
    })
      .then(response => response.json())
      .then(addedMedicine => {
        setMedicines([...medicines, addedMedicine]); // Thêm thuốc mới vào danh sách
        setNewMedicine({ medicine_name: '', description: '', price: '', manufacturer: '' }); // Xóa form nhập
      })
      .catch(error => console.error('Lỗi khi thêm thuốc:', error));
  };

  // Hàm xử lý thay đổi trong form thêm thuốc
  const handleNewMedicineChange = (event) => {
    const { name, value } = event.target;
    setNewMedicine(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className='dashboard'>
      <Navbar className='header'/>
      <div className='body'>
        <ServiceLeftbar className='leftbar'/>
        <div className='content'>
          <h1>Danh sách thuốc</h1>

          {/* Form thêm thuốc mới */}
          <div>
            <h2>Thêm thuốc mới</h2>
            <input 
              type="text" 
              name="medicine_name" 
              placeholder="Tên thuốc" 
              value={newMedicine.medicine_name} 
              onChange={handleNewMedicineChange} 
            />
            <input 
              type="text" 
              name="description" 
              placeholder="Mô tả" 
              value={newMedicine.description} 
              onChange={handleNewMedicineChange} 
            />
            <input 
              type="number" 
              name="price" 
              placeholder="Giá" 
              value={newMedicine.price} 
              onChange={handleNewMedicineChange} 
            />
            <input 
              type="text" 
              name="manufacturer" 
              placeholder="Nhà sản xuất" 
              value={newMedicine.manufacturer} 
              onChange={handleNewMedicineChange} 
            />
            <button onClick={handleAddMedicine}>Thêm</button>
          </div>

          {/* Bảng danh sách thuốc */}
          <div>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Tên thuốc</th>
                  <th>Mô tả</th>
                  <th>Giá</th>
                  <th>Nhà sản xuất</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map(medicine => (
                  <tr key={medicine.medicine_id}>
                    {editId === medicine.medicine_id ? (
                      <>
                        <td>
                          <input 
                            type="text" 
                            name="medicine_name" 
                            value={editFormData.medicine_name} 
                            onChange={handleEditFormChange} 
                          />
                        </td>
                        <td>
                          <input 
                            type="text" 
                            name="description" 
                            value={editFormData.description} 
                            onChange={handleEditFormChange} 
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            name="price" 
                            value={editFormData.price} 
                            onChange={handleEditFormChange} 
                          />
                        </td>
                        <td>
                          <input 
                            type="text" 
                            name="manufacturer" 
                            value={editFormData.manufacturer} 
                            onChange={handleEditFormChange} 
                          />
                        </td>
                        <td>
                          <button onClick={() => handleUpdate(medicine.medicine_id)}>Lưu</button>
                          <button onClick={handleCancel}>Hủy</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{medicine.medicine_name}</td>
                        <td>{medicine.description}</td>
                        <td>{medicine.price}</td>
                        <td>{medicine.manufacturer}</td>
                        <td>
                          <button onClick={() => handleEditClick(medicine)}>Sửa</button>
                          <button onClick={() => handleDelete(medicine.medicine_id)}>Xóa</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div> 
  );
}

export default Medicine;
