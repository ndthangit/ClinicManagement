import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Leftbar.css';
import { Button } from '@mui/material';

function Leftbar(state) {
  const navigate = useNavigate()
  return (
    <div className='Leftbar'>
        <Button className='button font' onClick={()=> {navigate('/appointment', {state:{userId:state.user.patient_id}})}}>Đặt lịch khám</Button>
        <Button className='button font'>Xem lịch khám</Button>
    </div>
  )
}

export default Leftbar
