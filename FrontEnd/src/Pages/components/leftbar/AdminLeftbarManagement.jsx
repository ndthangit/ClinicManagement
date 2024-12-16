import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaUserDoctor } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";


import { Button } from '@mui/material';

function AdminLeftbarManagement() {
    const navigate = useNavigate();

    return (
        <div className='Leftbar'>
            <Button className='button font' onClick={() => {
                navigate('/admin/management/DoctorDetails')
            }}>
                <FaUserDoctor className='icon'/>
                <p>Thông tin bác sĩ</p>
            </Button>
            <Button className='button font' onClick={() => {
                navigate('/admin/management/PatientDetails')
            }}>
                <IoPeople className='icon'/>
                <p>Thông tin bệnh nhân</p>
            </Button>
        </div>
    )
}

export default AdminLeftbarManagement