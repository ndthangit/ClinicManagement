import React from 'react';
import { Link } from 'react-router-dom';
import './Leftbar.css';

function Leftbar() {
  const patientId = 3; //sau sẽ nối với id của user
  return (
    <div className='Leftbar'>
        <Link className='button font' to='/appointment'>Đặt lịch khám</Link>
        <Link className='button font' to={`/schedule/${patientId}`}>Xem lịch khám</Link>
    </div>
  )
}

export default Leftbar
