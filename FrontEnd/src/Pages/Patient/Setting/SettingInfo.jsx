import React, { useState } from 'react';
import './SettingInfo.css'
import Navbar from "../../Components/navbar/Navbar";
import { Button } from '@mui/material';
import Axios from 'axios';
import {useSelector, useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../Features/UserSlice';


const SettingInfo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const patient = useSelector((state) => state.user.patient);
    const [formData, setFormData] = useState({
        patient_name: '',
        date_of_birth: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        patient_id: patient.user.patient_id,
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
        const userInfo = {
            patient_id: formData.patient_id,
            patient_name: formData.patient_name
        }
        dispatch(loginSuccess(userInfo));
        navigate('/');
    };

    return (
        <div className='settingInfo dashboard'>
            <Navbar className="header"/>
            <div className='body'>
                <div className='content'>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <p>Họ tên</p>
                            <input
                                type="text"
                                name="patient_name"
                                value={formData.patient_name}
                                onChange={handleChange}
                                placeholder="Patient Name"
                            />
                            <p>Ngày sinh</p>
                            <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                placeholder="Date of Birth"
                            />
                            <p>Giới tính</p>
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
                            <p>số điện thoại</p>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                            />
                            <p>Email</p>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                            />
                            <p>Địa chỉ</p>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Address"
                                maxLength={256}
                            />
                            <Button className='submit' type="submit">Save</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SettingInfo