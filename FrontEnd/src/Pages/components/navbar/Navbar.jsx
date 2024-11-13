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
          <p className='button font'>Lịch sử khám</p>
          <Link className='button font' to={'/service_price'}>Giá dịch vụ</Link>
          <Link className='button font' to={'/medicine'}>Giá thuốc</Link>
        </div>
        <div className="right">
          <Link className='button font' to={'/signup'}> Signup</Link>
          <Link className='button font' to={"/login"}> Login</Link>
        </div>
      </div>
  )
}

export default Navbar
