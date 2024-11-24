import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux";
import { Button } from '@mui/material';
import { logoutDoctor } from '../../Features/DoctorSlice';
import './Navbar.css'

function DoctorNavbar() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch()
  const doctor = useSelector((state)=>state.user.doctor);
  console.log(doctor);
  const handleLogout = () => {
    dispatch(logoutDoctor());
    navigateTo('/doctor/login');
  }

  return (
    <div className="navbar">
      <div className="left">
        <Button className='button font' onClick={() => navigateTo('/doctor/appointment')}>Lịch khám</Button>
        <Button className='button font' onClick={() => navigateTo('/doctor/medical')}>Khám bệnh</Button>
      </div>
      <div className="right">
        <Button className='button font' onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  )
}

export default DoctorNavbar
