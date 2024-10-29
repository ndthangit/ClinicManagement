import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Leftbar from '../components/appointment/Leftbar';
import exampleImage from '../Assets/person.png';
import './Appointment.css';

import axios from 'axios';



function Appointment() {


  const [listOfDoctors, setListOfDoctors] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [numsElements, setNumsElements] = useState(20);
  const nextElements = () => {
    if (startIndex + numsElements < listOfDoctors.length) {
      setStartIndex(startIndex+numsElements);
    }
  }

  useEffect(()=> {
    axios.get('http://localhost:3005/doctor').then((res) => {
      setListOfDoctors(res.data);
    });
  }, []);
  return (
    <div className='appointment'>
      <Navbar className="header"/>
      <div className='body'>
        <Leftbar className='leftBar'/>
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
                <div key={key} className='element'>
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
            <button onClick={()=> {nextElements()}}>tiếp</button> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment
