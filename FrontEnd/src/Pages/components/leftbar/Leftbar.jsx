import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Leftbar.css';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { BiBookAdd } from "react-icons/bi";

import axios from 'axios';

function Leftbar() {

  const {user} = useSelector((state) => state.user.patient);
  const navigate = useNavigate();

  const showSchedule = () => {
    if (!user) {
      navigate('/login');
    }
    else {
      
      axios.get(`http://localhost:3005/patient/byCCCD/${user.patient_id}`).then((response) => {
        navigate(`/schedule/${response.data.patient_id}`);
      });
      
    }
  }

  
  return (
       <div className='Leftbar'>
        <Button className='button font' onClick={() => {
          navigate('/appointment')
        }}>  
          <i class="fa-solid fa-calendar-day customed-icon"></i>
          <p className='text'> Đặt lịch khám </p>
        </Button>
        <Button className='button font' onClick={() => {
          showSchedule()
        }}>
          <i class="fa-solid fa-calendar-days customed-icon"></i>
          <p className="text">Xem lịch khám</p>
          </Button>
        
      </div>
  )
}

export default Leftbar
