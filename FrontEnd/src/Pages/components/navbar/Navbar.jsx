import React, {useEffect, useState} from 'react';
import './Navbar.css'
import {
    Link,
    useNavigate,
} from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import {logout} from "../../Features/UserSlice";


function Navbar() {

    const {user} = useSelector((state) => state.user.user);
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigateTo('/');
    }

    const handleLogin = () => {
        navigateTo('/login');
    }

    return (
        <div className="navbar">
            <div className="left">
                <Link className='button font' to={'/'}>Trang chủ</Link>
                <Link className='button font' to={'/appointment'}>Lịch khám</Link>
                <p className='button font'>Lịch sử khám</p>
                <p className='button font'>Thanh toán</p>
            </div>
            <div className="right">
                {user ? (
                    // Show "Logout" button when logged in
                    <button className="button font" onClick={handleLogout} >Logout</button>

                ) : (
                    // Show "Login" and "Signup" links when not logged in
                    <>
                        <Link className="button font" to={'/signup'}>Signup</Link>
                        <button className="button font" onClick={handleLogin}>Login</button>
                    </>
                )}

            </div>
        </div>
    )
}

export default Navbar