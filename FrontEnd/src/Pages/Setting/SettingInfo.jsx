import React, { useState } from 'react';
import './SettingInfo.css'
import Navbar from "../Components/navbar/Navbar";
import Leftbar from "../Components/Appointment/Leftbar";
import Axios from 'axios';

import {useSelector} from "react-redux";

const SettingInfo = () => {

    const patient = useSelector((state) => state.user.user);
    const [formData, setFormData] = useState({
        patient_name: '',
        date_of_birth: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        patient_id: patient.user,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Add your update logic here
        Axios.post('http://localhost:3005/patient/updatePatientInfo', formData).then((res) => {
            console.log(res.data);
        }).catch((error) => {
            console.error('Error during login request:', error);
        });
    };

    return (
        <div className='settingInfo'>
            <Navbar className="header"/>
            <div className='body'>
                <Leftbar className='leftBar'/>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="patient_name"
                            value={formData.patient_name}
                            onChange={handleChange}
                            placeholder="Patient Name"
                        />
                        <input
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            placeholder="Date of Birth"
                        />
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            maxLength={256}
                        />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SettingInfo