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
      const pages = (res.data.length / numsElements);
      
      setTotalPages( + 1);
    });
  }, []);

  const filterDoctor = () => {
    if (doctorFilter.length == 0) {
      setListOfDoctorsFilter(listOfDoctors);
    }
    else {
      setListOfDoctorsFilter(listOfDoctors.filter(obj => obj.doctor_name.toLowerCase().includes(doctorFilter.toLowerCase())));
      setStartIndex(0);
    }
    setTotalPages(ListOfDoctorsFilter.length);
  }


  return (
    <div className='appointment dashboard'>
      <Navbar className="header" />
      <div className='body'>
        <Leftbar className='leftBar' />
        <div className='content'>
          <div className='top'>
            <div className='search'>
              <input type='text' className='searchInput' onChange={(e) => {setDoctorFilter(e.target.value)}}></input>
              <button className='searchButton' onClick={() => {filterDoctor()}}>Tìm kiếm</button>
            </div>
          </div>
          <div className='table'>
            {ListOfDoctorsFilter.slice(startIndex*numsElements, startIndex*numsElements + numsElements).map((value, key) => {
              return (
                <div key={key} className='element' onClick={() => { selectElement(value.doctor_id) }}>
                  <div className='header'>
                    <img src={value.image_url ? value.image_url : imageAlt} alt="Example" className="image" ></img>
                  </div>
                  <div className='body'>
                    <p>{value.doctor_name}</p>
                    <p className='department'>{value.department_name}</p>
                    <p className='type'>{value.type_name}</p>
                  </div>
                  <div className='footer'>Đặt lịch</div>
                </div>
              )
            })}
          </div>
          <div className='bottom'>
            <div className='pageSetting'>
              <button onClick={() => { nextElements(false) }} disabled={startIndex === 0}>trước</button>
              <span>
                Page {startIndex+1} of {totalPages}
              </span>
              <button onClick={() => { nextElements(true) }} disabled={startIndex === totalPages-1}>tiếp</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment;