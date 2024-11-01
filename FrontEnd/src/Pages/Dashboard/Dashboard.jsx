import React from 'react';
import './Dashboard.css';
import NavBar from '../Components/NavBar/NavBar'
import Appointment from "../Apopointment/Appointment";
import {
    Link,
    useNavigate,
    createBrowserRouter,
    RouterProvider,
    BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';

function Dashboard() {

    return (
        <div className='dashboard'>
            <NavBar className='header'/>
        </div>
    )
}

export default Dashboard