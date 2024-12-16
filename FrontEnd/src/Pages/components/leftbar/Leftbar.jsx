import React from 'react';
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
        }}><i class="fa-solid fa-credit-card"></i>
            <div>xác nhận thanh toán</div></Button>

        <Button className='button font' onClick={() => {
          navigate('/admin/appointment')
        }}><i class="fa-solid fa-calendar-days"></i>
        Quản lý lịch khám</Button>

          <Button className='button font' onClick={() => {
              navigate('/admin/DoctorDetails')
          }}><i class="fa-solid fa-user-doctor"></i>
          Thông tin bác sỹ</Button>
          <Button className='button font' onClick={() => {
              navigate('/admin/PatientDetails')
          }}><i class="fa-solid fa-hospital-user"></i>
          Thông tin bệnh nhân</Button>

        <Button className='button font' onClick={() => {
          navigate('/admin/medicalexamination')
        }}>
          <i class="fa-solid fa-briefcase-medical"></i>
          Lịch sử khám bệnh</Button>
        <Button className='button font' onClick={() => {
          navigate('/admin/service_price') 
        }}><i class="fa-solid fa-money-bill-1-wave"></i>
        Giá thành</Button>
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
