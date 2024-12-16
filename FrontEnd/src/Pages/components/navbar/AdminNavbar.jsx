import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux";
import { Button } from '@mui/material';
import { NavLink } from "react-router-dom";
// import './Navbar.css'

function AdminNavbar() {
    const navigateTo = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = () => {
        // Clear localStorage if needed
        localStorage.removeItem('state');

        // Dispatch logout action
        dispatch({ type: 'LOGOUT' });
        navigateTo('/admin/login');
    }

    return (
        <div className="navbar">
            <div className="left">
                <Button className='button font' onClick={() => navigateTo('/admin')}>Home</Button>
                <Button className='button font' onClick={() => navigateTo('/admin/management')}>Quản lý </Button>
                <Button className='button font' onClick={() => navigateTo('/admin/schedule')}>Lịch khám</Button>
                <Button className='button font' onClick={() => navigateTo('/admin/service-medicine')}>Giá thành</Button>
            </div>
            <div className="right">
                <Button className='button font' onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    )
}

export default AdminNavbar
