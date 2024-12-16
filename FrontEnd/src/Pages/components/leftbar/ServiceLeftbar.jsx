import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './ServiceLeftbar.css'

function ServiceLeftbar() {
  const navigate = useNavigate();
  
  return (
    <div className='Leftbar'>
      <Button className='button font' onClick={() => {
        navigate('/service_price')
      }}>
        <i class="fa-solid fa-money-check customed-icon"></i>
        <p className="text">Giá dịch vụ</p>
      </Button>
      <Button className='button font' onClick={() => {
        navigate('/medicine')
      }}>
        <i class="fa-solid fa-money-bill customed-icon"></i>
        <p className="text">Giá thuốc</p>
      </Button>
    </div>
  )
}

export default ServiceLeftbar
