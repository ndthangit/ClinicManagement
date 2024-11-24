import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from '@mui/material';

function MedicalExamLeftbar() {
  const {user} = useSelector((state) => state.user.doctor);

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
        <Button className='button font' onClick={()=> {navigate('/doctor/medical')}}>Lịch khám</Button>
        <Button className='button font' onClick={()=> {navigate('/doctor/medical/history')}}>Lịch sử khám</Button>
    </div>
  )
}

export default MedicalExamLeftbar
