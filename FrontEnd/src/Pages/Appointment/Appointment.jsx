import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Leftbar from '../components/appointment/Leftbar';
import exampleImage from '../Assets/person.png';
import { useNavigate, useLocation } from 'react-router-dom';
import './Appointment.css';

import axios from 'axios';



function Appointment() {


  const [listOfDoctors, setListOfDoctors] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [numsElements, setNumsElements] = useState(20);
  const [userInfo, setUserInfo] = useState({});

  const history = useNavigate();
  const location = useLocation();
  const data = location.state;

  const nextElements = (next) => {
    if  (next == true) {
      if (startIndex + numsElements < listOfDoctors.length) {
        setStartIndex(startIndex+numsElements);
      }
    }
    else {
      if (startIndex - numsElements >= 0) {
        setStartIndex(startIndex-numsElements);
      }
    }
  }

  useEffect(()=> {
    axios.get('http://localhost:3005/doctor').then((res) => {
      setListOfDoctors(res.data);
    });
      axios.get(`http://localhost:3005/users/byId/${data.userId}`).then((res) => {
        setUserInfo(res.data)
      });
  }, []);
  return (
    <div className='appointment dashboard'>
      <Navbar className="header" user={userInfo}/>
      <div className='body'>
        <Leftbar className='leftBar' user={userInfo}/>
        <div className='content'>
          <div className='top'>
            <div className='search'>
            <input type='text' className='searchInput'></input>
            <button className='searchButton'>Tìm kiếm</button>
            </div>
          </div>
          <div className='table'>
            {listOfDoctors.slice(startIndex, startIndex+numsElements).map((value, key) => {
              return (
                <div key={key} className='element' onClick={() => {history(`/appointment/${value.doctor_id}`, {state:{userId:data.userId}})}}>
                  <div className='header'> 
                    <img src={exampleImage} alt="Example" className="image" ></img>
                  </div>
                  <div className='body'>  
                    <p>{value.doctor_name}</p>
                    <p>{value.specialty}</p>
                  </div>
                  <div className='footer'>Đặt lịch</div>
                </div>
              )
            })}
          </div>
          <div className='bottom'>
            <div className='pageSetting'>
              <button onClick={()=> {nextElements(false)}}>trước</button> 
              <button onClick={()=> {nextElements(true)}}>tiếp</button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment;
