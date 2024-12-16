import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Leftbar from '../../components/leftbar/Leftbar';
import { useNavigate } from 'react-router-dom';
import imageAlt from'../../Assets/person.png';
import './Appointment.css';

import axios from 'axios';
import { useSelector } from 'react-redux';

function Appointment() {

  const {user} = useSelector((state) => state.user.patient)
  const [listOfDoctors, setListOfDoctors] = useState([]);
  const [ListOfDoctorsFilter, setListOfDoctorsFilter] = useState([]); 
  const [startIndex, setStartIndex] = useState(0);
  const [numsElements, setNumsElements] = useState(10);
  const [doctorFilter, setDoctorFilter] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [listOfDoctorsTypes, setListOfDoctorsTypes] = useState([]);
  const [listOfDepartments, setListOfDepartments] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const history = useNavigate();

  const selectElement = (id) => {
    if (user !== null) {
      history(`/appointment/${id}`);
    }
    else {
      history('/login');
    }
  }

  const nextElements = (next) => {
    if  (next === true) {
      if (startIndex+1 < totalPages) {
        setStartIndex(startIndex + 1);
      }
    }
    else {
      if (startIndex - 1 >= 0) {
        setStartIndex(startIndex - 1);
      }
    }
  }

  useEffect(() => {
    axios.get('http://localhost:3005/doctor').then((res) => {
      setListOfDoctors(res.data);
      setListOfDoctorsFilter(res.data);
      const pages = Math.floor(res.data.length / numsElements);
      console.log(pages);
      setTotalPages(pages + 1);
    });

    axios.get('http://localhost:3005/doctor/type').then((res) => {
      setListOfDoctorsTypes(res.data);
    });

    axios.get('http://localhost:3005/doctor/departments').then((res) => {
      setListOfDepartments(res.data);
    });
    
  }, []);

  const filterDoctor = async () => {
    let filteredDoctors = listOfDoctors; // Dùng biến tạm để lưu danh sách ban đầu
  
    if (typeFilter !== '') {
      filteredDoctors = filteredDoctors.filter(obj => obj.type_id === typeFilter);
    }
  
    if (departmentFilter !== '') {
      filteredDoctors = filteredDoctors.filter(obj => obj.department_id === departmentFilter);
    }
  
    if (doctorFilter.length !== 0) {
      filteredDoctors = filteredDoctors.filter(obj => 
        obj.doctor_name.toLowerCase().includes(doctorFilter.toLowerCase())
      );
      setStartIndex(0);
    }
  
    // Cập nhật state cuối cùng
    setListOfDoctorsFilter(filteredDoctors);
    const pages = Math.floor(filteredDoctors.length / numsElements);
    console.log(pages);
    setTotalPages(pages + 1);
  };


  const showDoctors = () => {
    if (ListOfDoctorsFilter.length > 0) {
      return ListOfDoctorsFilter.slice(startIndex*numsElements, startIndex*numsElements + numsElements).map((value, key) => {
        return (
          <div key={key} className='element' onClick={() => { selectElement(value.doctor_id) }}>
            <div className='header'>
              <img src={value.img ? value.img : imageAlt} alt="Example" className="image" ></img>
            </div>
            <div className='body'>
              <p>{value.doctor_name}</p>
              <p className='department'>{value.department_name}</p>
              <p className='type'>{value.type_name}</p>
            </div>
            <div className='footer'>Đặt lịch</div>
          </div>
        )
      })
    } else {
      return (<p>Không có danh sách</p>)
    }
  }

  return (
    <div className='appointment dashboard'>
      <Navbar className="header" />
      <div className='body'>
        <Leftbar className='leftBar' />
        <div className='content'>
          <div className='top'>
            
            <div className="filters">  
              <select onChange={(e) => {setTypeFilter(e.target.value)}}>
                  <option value={""}>Tất cả cấp bậc</option>
                  {
                    listOfDoctorsTypes.map((value, index) => {
                      return (
                        <option key={index} value={value.type_id}>
                          {value.type_name}
                        </option>
                      )
                    })
                  }
              </select>

              <select onChange={(e) => {setDepartmentFilter(e.target.value)}}>
                  <option value="">Tất cả khoa</option>
                  {
                    listOfDepartments.map((value, index) => {
                      return (
                        <option key={index} value={value.department_id}>
                          {value.department_name}
                        </option>
                      )
                    })
                  }
              </select>

              <button onClick={() => filterDoctor()}>Xác nhận</button>
            </div>
            <div className='search-container'>
              <input type='text' className='searchDoctorName-input' onChange={(e) => {setDoctorFilter(e.target.value)}} placeholder='Tìm kiếm '></input>
              <button className=' searchInput' onClick={() => {filterDoctor()}}>Tìm kiếm</button>
            </div>
          </div>
          <div className='table'>
            {showDoctors()}
          </div>
          <div className='bottom'>
            <div className='pageSetting'>
              <button className='nextPage' onClick={() => { nextElements(false) }} disabled={startIndex === 0}>trước</button>
              <span className='pages'>
                Page {startIndex+1} of {totalPages}
              </span>
              <button className='nextPage' onClick={() => { nextElements(true) }} disabled={startIndex === totalPages-1}>tiếp</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment;