import React, { useState } from 'react';
import './SettingInfo.css'
import Navbar from "../../components/navbar/Navbar";
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
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.patient_name || !formData.date_of_birth || !formData.gender || !formData.phone) {
            setError('Vui lòng điền đầy đủ thông tin các trường bắt buộc.');
            return;
        }
        setError('');


        Axios.post('http://localhost:3005/patient/updatePatientInfo', formData).then((res) => {
            console.log(res.data);
        }).catch((error) => {
            console.error('Error during update request:', error);
        });
        const userInfo = {
            patient_id: formData.patient_id,
            patient_name: formData.patient_name
        };
        dispatch(loginSuccess(userInfo));
        navigate('/');
    };

    return (
        <div className='settingInfo dashboard'>
            <div className='body'>
                <div className='fullycontent'>
                    <div className="form-container">
                        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Cập nhật thông tin cá nhân
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <p>Họ tên</p>
                            <input
                                type="text"
                                name="patient_name"
                                value={formData.patient_name}
                                onChange={handleChange}
                                placeholder="Patient Name"
                                className={error && !formData.patient_name ? 'error' : ''}
                            />
                            {error && !formData.patient_name && <p className="error">*Vui lòng nhập tên.</p>}

                            <p>Ngày sinh</p>
                            <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                placeholder="Date of Birth"
                                className={error && !formData.date_of_birth ? 'error' : ''}
                            />
                            {error && !formData.date_of_birth && <p className="error">*Vui lòng chọn ngày sinh.</p>}

                            <p>Giới tính</p>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className={error && !formData.gender ? 'error' : ''}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {error && !formData.gender && <p className="error">*Vui lòng chọn giới tính.</p>}

                            <p>Số điện thoại</p>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className={error && !formData.phone ? 'error' : ''}
                            />
                            {error && !formData.phone && <p className="error">*Vui lòng nhập số điện thoại.</p>}

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