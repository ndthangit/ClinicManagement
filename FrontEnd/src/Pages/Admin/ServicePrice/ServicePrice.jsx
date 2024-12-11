
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/AdminNavbar';
import axios from 'axios';
import './ServicePrice.css'
import ServiceLeftbar from '../../components/leftbar/ServiceLeftbarAdmin';

function ServicePrice() {
  const [departments, setDepartments] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const navigate = useNavigate();

  // Lấy danh sách phòng ban khi component được render lần đầu
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    axios.get('http://localhost:3005/service_price')
      .then((response) => {
        setDepartments(response.data);
      })
      .catch(error => console.error('Lỗi khi lấy dữ liệu phòng ban:', error));
  };

  // Lấy danh sách dịch vụ theo phòng ban khi người dùng chọn phòng ban
  const fetchServicesByDepartment = (departmentId) => {
    axios.get(`http://localhost:3005/service_price/${departmentId}`)
      .then((response) => {
        setServices(response.data);
        setSelectedDepartment(departmentId); 
      })
      .catch(error => console.error('Lỗi khi lấy dữ liệu dịch vụ:', error));
  };

  // Hàm xóa phòng ban
  const deleteDepartment = (departmentId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phòng ban này?')) {
      axios.delete(`http://localhost:3005/service_price/delete_department/${departmentId}`)
        .then(() => {
          // Cập nhật danh sách phòng ban sau khi xóa
          setDepartments(departments.filter(dept => dept.department_id !== departmentId));
          // Nếu đang xem dịch vụ của phòng ban vừa xóa, quay lại danh sách phòng ban
          if (selectedDepartment === departmentId) {
            setSelectedDepartment(null);
            setServices([]);
          }
        })
        .catch(error => console.error('Lỗi khi xóa phòng ban:', error));
    }
  };

  // Hàm xóa dịch vụ
  const deleteService = (serviceId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
      axios.delete(`http://localhost:3005/service_price/delete_service/${serviceId}`)
        .then(() => {
          // Cập nhật danh sách dịch vụ sau khi xóa
          setServices(services.filter(service => service.service_id !== serviceId));
        })
        .catch(error => console.error('Lỗi khi xóa dịch vụ:', error));
    }
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
                        <button 
                          className='buttonInfo' 
                          onClick={() => fetchServicesByDepartment(department.department_id)}
                        >
                          Xem
                        </button>
                        {/* Nút Xóa phòng ban */}
                        <button 
                          className='buttonDelete' 
                          onClick={() => deleteDepartment(department.department_id)}
                          style={{ marginLeft: '10px', color: 'white' }}
                        >
                          Xóa
                        </button>
                        <button 
                          className='buttonInsert' 
                          style={{ marginLeft: '10px', color: 'white' }}
                        >
                          Sửa
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
              <table className='tableService'>
                <thead>
                  <tr>
                    <th>Tên dịch vụ</th>
                    <th>Mô tả</th>
                    <th>Giá</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(service => (
                    <tr key={service.service_id}>
                      <td>{service.service_name}</td>
                      <td>{service.description}</td>
                      <td>{service.price}</td>
                      <td>
                        {/* Nút Xóa dịch vụ */}
                        <button 
                          className='buttonDelete' 
                          onClick={() => deleteService(service.service_id)}
                          style={{ backgroundColor: 'red', color: 'white' }}
                        >
                          Xóa
                        </button>
                      </td>
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
