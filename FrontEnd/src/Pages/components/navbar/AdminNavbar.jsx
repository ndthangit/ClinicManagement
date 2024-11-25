import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux";
import { Button } from '@mui/material';
import './Navbar.css'

function AdminNavbar() {
    const navigateTo = useNavigate();
    const dispatch = useDispatch()
    const doctor_name = useSelector((state)=>state.user.doctor);

    const handleLogout = () => {
        navigateTo('/admin/login');
    }

    return (
        <div className="navbar">
            <div className="left">
                <Button className='button font' onClick={() => navigateTo('/admin')}>Home</Button>
                {/*<Button className='button font' onClick={() => navigateTo('/admin/payments')}>Thanh toán </Button>*/}
            </div>
            <div className="right">
                <Button className='button font' onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    )
}

export default AdminNavbar
