import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorLeftbar.css';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

function DoctorLeftbar() {
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user.doctor);
    const handleViewAppointments = () => {
        if(!user) {
            navigate('/doctor/login');
        } else {
            navigate(`/doctor/appointment`);
        }
    };

    const handleApproveAppointments = () => {
        if (!user) {
            navigate('/doctor/login');
        } else {
            navigate(`/doctor/approve-appointments/${user.doctor_id}`);
        }
    };

    return (
        <div className='Leftbar'>
        <Button className='button font' onClick={handleViewAppointments}>Xem lịch khám</Button>
        <Button className='button font' onClick={handleApproveAppointments}>Duyệt lịch khám</Button>
        </div>
    );
}

export default DoctorLeftbar;