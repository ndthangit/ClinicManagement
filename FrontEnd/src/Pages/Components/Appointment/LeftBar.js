import React from 'react';
import { Link } from 'react-router-dom';
import './LeftBar.css';

function LeftBar() {
    return (
        <div className='Leftbar'>
            <Link className='button font' to='/appointment'>Đặt lịch khám</Link>
            <Link className='button font'>Xem lịch khám</Link>
        </div>
    )
}

export default LeftBar