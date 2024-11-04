import React, {useEffect, useState} from 'react';
import './Dashboard.css'; 
import {
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import axios from 'axios';
import Navbar from '../components/navbar/Navbar';


function Dashboard() {
  const location = useLocation();
  let data = location.state;
  const [userInfo, setUserInfo] = useState({});

  useEffect( () => {
    if (data === null) {
      data = {userId: undefined};
    }
    axios.get(`http://localhost:3005/users/byId/${data.userId}`).then((respone) => {
      setUserInfo(respone.data);
    });
  }, [])

  return (
    <div className='dashboard'>
      <Navbar className='header' user={userInfo}/>
    </div>
  )
}

export default Dashboard
