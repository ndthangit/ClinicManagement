import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/AdminNavbar';
import axios from 'axios';
import './ServicePrice.css';
import AdminServiceLeftbar from '../../components/leftbar/AdminServiceLeftbar';

function ServicePrice() {
  const [departments, setDepartments] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editedDepartmentName, setEditedDepartmentName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
  const [editedLocation, setEditedLocation] = useState('');
  const [editingService, setEditingService] = useState(null);
  const [editedServiceName, setEditedServiceName] = useState('');
  const [editedServiceDescription, setEditedServiceDescription] = useState('');
  const [editedServicePrice, setEditedServicePrice] = useState('');
  const [editedServiceDepartmentId, setEditedServiceDepartmentId] = useState('');
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newDepartmentDescription, setNewDepartmentDescription] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDescription, setNewServiceDescription] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const navigate = useNavigate();

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

  const fetchServicesByDepartment = (departmentId) => {
    axios.get(`http://localhost:3005/service_price/${departmentId}`)
      .then((response) => {
        setServices(response.data);
        setSelectedDepartment(departmentId);
      })
      .catch(error => console.error('Lỗi khi lấy dữ liệu dịch vụ:', error));
  };

  const deleteDepartment = (departmentId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phòng ban này?')) {
      axios.delete(`http://localhost:3005/service_price/delete_department/${departmentId}`)
        .then(() => {
          setDepartments(departments.filter(dept => dept.department_id !== departmentId));
          if (selectedDepartment === departmentId) {
            setSelectedDepartment(null);
            setServices([]);
          }
        })
        .catch(error => console.error('Lỗi khi xóa phòng ban:', error));
    }
  };

  const deleteService = (serviceId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
      axios.delete(`http://localhost:3005/service_price/delete_service/${serviceId}`)
        .then(() => {
          setServices(services.filter(service => service.service_id !== serviceId));
        })
        .catch(error => console.error('Lỗi khi xóa dịch vụ:', error));
    }
  };

  const startEditing = (department) => {
    setEditingDepartment(department.department_id);
    setEditedDepartmentName(department.department_name);
    setEditedDescription(department.description);
    setEditedPhoneNumber(department.phone_number);
    setEditedLocation(department.location);
  };

  const saveDepartment = (departmentId) => {
    axios.put(`http://localhost:3005/service_price/edit_department/${departmentId}`, {
      department_name: editedDepartmentName,
      description: editedDescription,
      phone_number: editedPhoneNumber,
      location: editedLocation,
    })
      .then(() => {
        const updatedDepartments = departments.map((dept) =>
          dept.department_id === departmentId
            ? { ...dept, department_name: editedDepartmentName, description: editedDescription, phone_number: editedPhoneNumber, location: editedLocation }
            : dept
        );
        setDepartments(updatedDepartments);
        setEditingDepartment(null);
      })
      .catch(error => console.error('Lỗi khi cập nhật phòng ban:', error));
  };

  const cancelEditing = () => {
    setEditingDepartment(null);
    setEditedDepartmentName('');
    setEditedDescription('');
    setEditedPhoneNumber('');
    setEditedLocation('');
  };

  const startEditingService = (service) => {
    setEditingService(service.service_id);
    setEditedServiceName(service.service_name);
    setEditedServiceDescription(service.description);
    setEditedServicePrice(service.price);
  };

  const saveService = (serviceId) => {
    axios.put(`http://localhost:3005/service_price/edit_service/${serviceId}`, {
      service_name: editedServiceName,
      description: editedServiceDescription,
      price: editedServicePrice,
      department_id: editedServiceDepartmentId,
    })
      .then(() => {
        const updatedServices = services.map((svc) =>
          svc.service_id === serviceId
            ? { ...svc, service_name: editedServiceName, description: editedServiceDescription, price: editedServicePrice, department_id: editedServiceDepartmentId }
            : svc
        );
        setServices(updatedServices);
        setEditingService(null);
      })
      .catch(error => console.error('Lỗi khi cập nhật dịch vụ:', error));
  };

  const cancelEditingService = () => {
    setEditingService(null);
    setEditedServiceName('');
    setEditedServiceDescription('');
    setEditedServicePrice('');

  };

  const addDepartment = async () => {
    if (!newDepartmentName || !newDepartmentDescription || !newPhoneNumber || !newLocation) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    try {
        const response = await axios.post('http://localhost:3005/service_price/add_department', {
            department_name: newDepartmentName,
            description: newDepartmentDescription,
            phone_number: newPhoneNumber,
            location: newLocation,
        });

        // Cập nhật state để hiển thị dữ liệu mới ngay lập tức
        const newDepartment = {
            department_id: response.data.department_id,
            department_name: newDepartmentName,
            description: newDepartmentDescription,
            phone_number: newPhoneNumber,
            location: newLocation,
        };
        setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);

        // Reset các trường input
        setNewDepartmentName('');
        setNewDepartmentDescription('');
        setNewPhoneNumber('');
        setNewLocation('');
    } catch (error) {
        console.error('Lỗi khi thêm phòng ban:', error);
        alert('Không thể thêm phòng ban.');
    }
};


const addService = async () => {
  if (!newServiceName || !newServiceDescription || !newServicePrice || !selectedDepartment) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
  }

  try {
      const response = await axios.post('http://localhost:3005/service_price/add_service', {
          service_name: newServiceName,
          description: newServiceDescription,
          price: newServicePrice,
          department_id: selectedDepartment,
      });

      // Cập nhật state để hiển thị dữ liệu mới ngay lập tức
      const newService = {
          service_id: response.data.service_id,
          service_name: newServiceName,
          description: newServiceDescription,
          price: newServicePrice,
          department_id: selectedDepartment,
      };
      setServices((prevServices) => [...prevServices, newService]);

      // Reset các trường input
      setNewServiceName('');
      setNewServiceDescription('');
      setNewServicePrice('');
  } catch (error) {
      console.error('Lỗi khi thêm dịch vụ:', error);
      alert('Không thể thêm dịch vụ.');
  }
};


  return (
    <div className='dashboard servicePrice'>
      <Navbar className='navbar' />

      <div className='body'>
        <AdminServiceLeftbar className='leftbar' />
        <div className='content'>
          <h1>Danh sách phòng ban và dịch vụ</h1>

          {!selectedDepartment ? (
            <div>
              <h2>Danh sách phòng ban</h2>
              <div className="add-form">
                <input
                  type="text"
                  placeholder="Tên phòng ban"
                  value={newDepartmentName}
                  onChange={(e) => setNewDepartmentName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Mô tả"
                  value={newDepartmentDescription}
                  onChange={(e) => setNewDepartmentDescription(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Địa điểm"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                />
                <button onClick={addDepartment}>Thêm</button>
              </div>
              <table className='tableService'>
                <thead>
                  <tr>
                    <th>Tên phòng ban</th>
                    <th>Mô tả</th>
                    <th>Số điện thoại</th>
                    <th>Địa điểm</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map(department => (
                    <tr key={department.department_id}>
                      <td>
                        {editingDepartment === department.department_id ? (
                          <input
                            type="text"
                            value={editedDepartmentName}
                            onChange={(e) => setEditedDepartmentName(e.target.value)}
                          />
                        ) : (
                          department.department_name
                        )}
                      </td>
                      <td>
                        {editingDepartment === department.department_id ? (
                          <input
                            type="text"
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                          />
                        ) : (
                          department.description
                        )}
                      </td>
                      <td>
                        {editingDepartment === department.department_id ? (
                          <input
                            type="text"
                            value={editedPhoneNumber}
                            onChange={(e) => setEditedPhoneNumber(e.target.value)}
                          />
                        ) : (
                          department.phone_number
                        )}
                      </td>
                      <td>
                        {editingDepartment === department.department_id ? (
                          <input
                            type="text"
                            value={editedLocation}
                            onChange={(e) => setEditedLocation(e.target.value)}
                          />
                        ) : (
                          department.location
                        )}
                      </td>
                      <td>
                        {editingDepartment === department.department_id ? (
                          <>
                            <button onClick={() => saveDepartment(department.department_id)}>Lưu</button>
                            <button onClick={cancelEditing} style={{ marginLeft: '10px' }}>Hủy</button>
                          </>
                        ) : (
                          <>
                            <button
                              className='buttonInfo'
                              onClick={() => fetchServicesByDepartment(department.department_id)}
                            >
                              Xem
                            </button>
                            <button
                              className='buttonDelete'
                              onClick={() => deleteDepartment(department.department_id)}
                              style={{ marginLeft: '10px', color: 'white' }}
                            >
                              Xóa
                            </button>
                            <button
                              className='buttonInsert'
                              onClick={() => startEditing(department)}
                              style={{ marginLeft: '10px', color: 'white' }}
                            >
                              Sửa
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <h2>Dịch vụ cho phòng ban {selectedDepartment}</h2>
              <button onClick={() => setSelectedDepartment(null)}>Quay lại danh sách phòng ban</button>
              <div className="add-form">
                <input
                  type="text"
                  placeholder="Tên dịch vụ"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Mô tả"
                  value={newServiceDescription}
                  onChange={(e) => setNewServiceDescription(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Giá"
                  value={newServicePrice}
                  onChange={(e) => setNewServicePrice(e.target.value)}
                />

                <button onClick={addService}>Thêm</button>
              </div>
              <table className='tableService'>
                <thead>
                  <tr>
                    <th>Tên dịch vụ</th>
                    <th>Mô tả</th>
                    <th>Giá</th>
                    <th>ID phòng ban</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(service => (
                    <tr key={service.service_id}>
                      <td>
                        {editingService === service.service_id ? (
                          <input
                            type="text"
                            value={editedServiceName}
                            onChange={(e) => setEditedServiceName(e.target.value)}
                          />
                        ) : (
                          service.service_name
                        )}
                      </td>
                      <td>
                        {editingService === service.service_id ? (
                          <input
                            type="text"
                            value={editedServiceDescription}
                            onChange={(e) => setEditedServiceDescription(e.target.value)}
                          />
                        ) : (
                          service.description
                        )}
                      </td>
                      <td>
                        {editingService === service.service_id ? (
                          <input
                            type="number"
                            value={editedServicePrice}
                            onChange={(e) => setEditedServicePrice(e.target.value)}
                          />
                        ) : (
                          service.price
                        )}
                      </td>
                      <td>
                        {editingService === service.service_id ? (
                          <input
                            type="text"
                            value={editedServiceDepartmentId}
                            onChange={(e) => setEditedServiceDepartmentId(e.target.value)}
                          />
                        ) : (
                          service.department_id
                        )}
                      </td>
                      <td>
                        {editingService === service.service_id ? (
                          <>
                            <button onClick={() => saveService(service.service_id)}>Lưu</button>
                            <button onClick={cancelEditingService} style={{ marginLeft: '10px' }}>Hủy</button>
                          </>
                        ) : (
                          <>
                            <button
                              className='buttonDelete'
                              onClick={() => deleteService(service.service_id)}
                              
                            >
                              Xóa
                            </button>
                            <button
                              className='buttonInsert'
                              onClick={() => startEditingService(service)}
                              style={{ marginLeft: '10px', color: 'white' }}
                            >
                              Sửa
                            </button>
                          </>
                        )}
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