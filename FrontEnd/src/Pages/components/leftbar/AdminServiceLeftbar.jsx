import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { IoMdPricetags } from "react-icons/io";
import { AiOutlineMedicineBox } from "react-icons/ai";



function AdminServiceLeftbar() {
  const navigate = useNavigate();
  
  return (
    <div className='Leftbar'>
      <Button className='button font' onClick={() => {
        navigate('/admin/service-price')
      }}>
        <IoMdPricetags className='icon'/>
        <p>Giá dịch vụ</p>
        </Button>
      <Button className='button font' onClick={() => {
        navigate('/admin/medicine')
      }}>
        < AiOutlineMedicineBox className='icon'/>
        <p>Giá thuốc</p>
      </Button>
    </div>
  )
}

export default AdminServiceLeftbar
