// ServicePricePage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import './ServicePrice.css'
import ServiceLeftbar from '../../components/leftbar/ServiceLeftbar';
function ServicePrice() {
  const [departments, setDepartments] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const navigate = useNavigate();

  // Lấy danh sách phòng ban khi component được render lần đầu
  useEffect(() => {
    axios.get('http://localhost:3005/service_price').then((response) => {
      setDepartments(response.data)
    });
  }, []);

  // Lấy danh sách dịch vụ theo phòng ban khi người dùng chọn phòng ban
  const fetchServicesByDepartment = (departmentId) => {
    axios.get(`http://localhost:3005/service_price/${departmentId}`).then((response) => {
      setServices(response.data);
      setSelectedDepartment(departmentId); 
    }).catch(error => console.error('Lỗi khi lấy dữ liệu dịch vụ:', error));
  };

  return (
    <div className='dashboard servicePrice'>
      <Navbar className='navbar'/>
      
      <div className='body'>
        <ServiceLeftbar className='leftbar' />
        <div className='content'>
        <h1>Danh sách phòng ban và dịch vụ</h1>
          {/* Hiển thị danh sách phòng ban */}
      {!selectedDepartment ? (
        <div>
          <h2>Danh sách phòng ban</h2>
          <table className='tableService'>
            <thead>
              <tr>
                <th>Tên phòng ban</th>
                <th>Mô tả</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {departments.map(department => (
                <tr key={department.department_id}>
                  <td>{department.department_name}</td>
                  <td>{department.description}</td>
                  <td>
                    <button className='buttonInfo' onClick={() => fetchServicesByDepartment(department.department_id)}>
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Hiển thị danh sách dịch vụ theo phòng ban đã chọn
        <div>
          <h2>Dịch vụ cho phòng ban {selectedDepartment}</h2>
          <button onClick={() => setSelectedDepartment(null)}>Quay lại danh sách phòng ban</button>
          <table>
            <thead>
              <tr>
                <th>Tên dịch vụ</th>
                <th>Mô tả</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.service_id}>
                  <td>{service.service_name}</td>
                  <td>{service.description}</td>
                  <td>{service.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}

export default ServicePrice;
