import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function AdminLeftbarManagement() {
    const navigate = useNavigate();

    return (
        <div className='Leftbar'>
            <Button className='button font' onClick={() => {
                navigate('/admin/management/payments')
            }}>Xác nhận thanh toán</Button>
            <Button className='button font' onClick={() => {
                navigate('/admin/management/DoctorDetails')
            }}>Thông tin bác sĩ</Button>
            <Button className='button font' onClick={() => {
                navigate('/admin/management/PatientDetails')
            }}>Thông tin bệnh nhân</Button>
        </div>
    )
}

export default AdminLeftbarManagement