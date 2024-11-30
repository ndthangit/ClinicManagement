import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Leftbar.css';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Leftbar() {

  const {user} = useSelector((state) => state.user.patient);
  const {admin} = useSelector((state) => state.user.admin);
  console.log(user);
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
    admin ? (
      <div className='Leftbar'>
        <Button className='button font' onClick={() => {
          navigate('/admin/payments')
        }}>xác nhận thanh toán </Button>

        <Button className='button font' onClick={() => {
          navigate('/admin/appointment')
        }}>Quản lý lịch khám</Button>

          <Button className='button font' onClick={() => {
              navigate('/admin/DoctorDetails')
          }}>Thông tin bác sỹ</Button>
          <Button className='button font' onClick={() => {
              navigate('/admin/PatientDetails')
          }}>Thông tin bệnh nhân</Button>
      </div>
    ) : (
      <div className='Leftbar'>
        <Button className='button font' onClick={() => {
          navigate('/appointment')
        }}>Đặt lịch khám</Button>
        <Button className='button font' onClick={() => {
          showSchedule()
        }}>Xem lịch khám</Button>
      </div>
    )
)
}

export default Leftbar
