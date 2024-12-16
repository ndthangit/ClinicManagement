import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { FaClipboardList } from "react-icons/fa";
import { GoHistory } from "react-icons/go";



function AdminLeftbarSchedule() {
    const navigate = useNavigate();

    return (
        <div className='Leftbar'>
            <Button className='button font' onClick={() => {
                navigate('/admin/schedule/appointment')
            }}>
                <FaClipboardList className='icon'/>
                <p>Thông tin lịch khám</p>
            </Button>
            <Button className='button font' onClick={() => {
                navigate('/admin/schedule/medicalexamination')
            }}>
                <GoHistory className='icon'/>
                <p>Lịch sử khám bệnh</p>
            </Button>
        </div>
    )
}

export default AdminLeftbarSchedule