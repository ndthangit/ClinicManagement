import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function ServiceLeftbar() {
  const navigate = useNavigate();
  
  return (
    <div className='Leftbar'>
      <Button className='button font' onClick={() => {
        navigate('/service_price')
      }}>Giá dịch vụ</Button>
      <Button className='button font' onClick={() => {
        navigate('/medicine')
      }}>Giá thuốc</Button>
    </div>
  )
}

export default ServiceLeftbar
