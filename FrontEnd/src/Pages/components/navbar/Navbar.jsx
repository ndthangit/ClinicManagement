import React, {useEffect, useState} from 'react';
import './Navbar.css'
import {
    Link,
} from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import { Button } from '@mui/material';
import {logout} from "../../Features/UserSlice";
import { useNavigate } from 'react-router-dom';

import './Navbar.css'


function Navbar() {
    const {user} = useSelector((state) => state.user.patient);

    // const {user} = useSelector((state) => state.user);
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigateTo('/');
    }

    const handleLogin = () => {
        navigateTo('/login');
    }
    const handleSetting =() =>{
        navigateTo('/settingInfo');
    }

    return (
        <div className="navbar">
            <div className="left">
                <Link className='button font' to={'/'}>
                    <i class="fa-solid fa-house customed-icon"></i>
                    <div>Trang chủ</div>
                </Link>
                <Link className='button font' to={'/appointment'}>
                    <i class="fa-solid fa-calendar-days customed-icon"></i>
                    Lịch khám
                </Link>
                <Link className='button font' to={'/medicalhistory'}>
                    <i class="fa-solid fa-clock-rotate-left customed-icon"></i>
                    Lịch sử khám
                </Link>
                <Link className='button font' to={'/service_price'}>
                    <i class="fa-solid fa-dollar-sign customed-icon"></i>
                    Giá thành
                </Link>
            </div>
            <div className="right">
                {user ? (
                    // Show "Logout" button when logged in
                    <div className="dropdown">
                        <Button className="button font" >
                            {user.patient_name} <i className="fa fa-caret-down"></i>
                        </Button>
                        <div className="dropdown-content">

                            <a href="#" onClick={handleSetting}>Setting</a>
                            <a href="#" onClick={handleLogout}>Logout</a>
                        </div>
                    </div>
                ) : (
                    // Show "Login" and "Signup" links when not logged in
                    <>
                        <Link className="button font" to={'/signup'}>Signup</Link>
                        <Button className="button font" onClick={handleLogin}>Login</Button>
                    </>
                )}

            </div>
        </div>

    )
}

export default Navbar
