import React from 'react';
import './Dashboard.css'; 
import {
  Link,
  useNavigate,
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';

import Navbar from '../Components/NavBar/Navbar';


function Dashboard() {

  return (
    <div className='dashboard'>
      <Navbar className='header'/>
    </div>
  )
}

export default Dashboard
