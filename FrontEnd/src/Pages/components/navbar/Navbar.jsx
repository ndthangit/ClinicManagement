import React from 'react';
import './Navbar.css'
import {
    Link,
} from 'react-router-dom';

function Navbar() {
    return (
        <div className="navbar">
            <div className="left">
                <Link className='button font' to={'/'}>Trang chủ</Link>
                <Link className='button font' to={'/appointment'}>Lịch khám</Link>
                <Link className='button font' to={'/medicalhistory'}>Lịch sử khám</Link>
                <p className='button font'>Thanh toán</p>
            </div>
            <div className="right">
                <Link className='button font' to={'/signup'}> Signup</Link>
                <Link className='button font' to={"/login"}> Login</Link>
            </div>
        </div>
    )
}

export default Navbar