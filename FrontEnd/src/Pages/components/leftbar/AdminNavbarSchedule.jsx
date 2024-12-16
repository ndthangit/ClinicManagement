import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function AdminLeftbarSchedule() {
    const navigate = useNavigate();

    return (
        <div className='Leftbar'>
            <Button className='button font' onClick={() => {
                navigate('/admin/schedule/appointment')
            }}>Thông tin lịch khám</Button>
            <Button className='button font' onClick={() => {
                navigate('/admin/schedule/medicalexamination')
            }}>Lịch sử khám bệnh</Button>
        </div>
    )
}

export default AdminLeftbarSchedule