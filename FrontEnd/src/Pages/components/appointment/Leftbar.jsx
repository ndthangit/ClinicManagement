import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Leftbar.css';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Leftbar() {

  const {user} = useSelector((state) => state.user.user);
  const {patient, setPatient} = useState({});
  const navigate = useNavigate();

  const showSchedule = () => {
    if (!user) {
      navigate('/login');
    }
    else {
      axios.get(`/patient/byCCCD/${user}`).then((response) => {
        setPatient(response.data)
      });
      navigate(`/schedule/${patient.patient_id}`);
    }
  }

  
  return (
    <div className='Leftbar'>
        <Button className='button font' onClick={()=> {navigate('/appointment')}}>Đặt lịch khám</Button>
        <Button className='button font' onClick={()=> {showSchedule}}>Xem lịch khám</Button>
    </div>
  )
}

export default Leftbar
