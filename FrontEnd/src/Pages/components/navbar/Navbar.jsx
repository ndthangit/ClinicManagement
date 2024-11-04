import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Navbar.css'
import {
  useNavigate
} from 'react-router-dom';
import { Button } from '@mui/material';

function Navbar(state) {
  const navigate = useNavigate();

  const hasLogin = (user) => {
    if (Object.keys(user).length > 0) {
      return (<div className="right">
                <Button className='button font' onClick={() => {navigate('/signup', {state:{userId:user.patient_id}})}}> {user.patient_name}</Button>
              </div>)
    }
    else {
      return (<div className="right">
                <Button className='button font' onClick={() => {navigate('/signup')}}> Signup</Button>
                <Button className='button font' onClick={() => {navigate('/login')}}> Login</Button>
              </div>)
    }
  }
  return (
      <div className="navbar">
        <div className="left">
          <Button className='button font' onClick={() => {navigate('/', {state:{userId:state.user.patient_id}})}}>Trang chủ</Button>
          <Button className='button font' onClick={() => {navigate('/appointment', {state:{userId:state.user.patient_id}})}}>Lịch khám</Button>
          <p className='button font'>Lịch sử khám</p>
          <p className='button font'>Thanh toán</p>
        </div>
        {
          hasLogin(state.user)
        }
      </div>
  )
}

export default Navbar
