// ServicePricePage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Components/navbar/Navbar';

function Medicine() {
  const [medicines, setMedicines] = useState([]);

  const navigate = useNavigate();

  // Lấy danh sách phòng ban khi component được render lần đầu
  useEffect(() => {
    fetch('http://localhost:3005/medicine') 
      .then(response => response.json())
      .then(data => setMedicines(data))
      .catch(error => console.error('Lỗi khi lấy dữ liệu thuốc:', error));
  }, []);



  return (
    <div>
      <Navbar />
      <h1>Danh sách thuốc</h1>
        <div>
          <table>
            <thead>
              <tr>
                <th>Tên thuốc</th>
                <th>Mô tả</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map(medicine => (
                <tr key={medicine.medicine_id}>
                  <td>{medicine.medicine_name}</td>
                  <td>{medicine.description}</td>
                  <td>{medicine.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
    </div>
  );
}

export default Medicine;
