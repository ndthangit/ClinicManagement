import React, { useState } from 'react';
import './AddDoctorForm.css';
import {useDispatch} from "react-redux";
import Axios from 'axios';
import {fetchDoctorInfo} from "../../Features/DoctorInforSlice";

const AddDoctorForm = ({ onSave, onCancel }) => {
    const dispatch = useDispatch();
    const [doctorData, setDoctorData] = useState({
        doctor_name: '',
        department_id: '',
        type_id: '',
        phone: '',
        email: '',
        address: '',
        username: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDoctorData({
            ...doctorData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(doctorData);
        setDoctorData({
            doctor_name: '',
            department_id: '',
            type_id: '',
            phone: '',
            email: '',
            address: '',
            username: '',
        });

        const values = {
            doctor_name: doctorData.doctor_name,
            department_id: doctorData.department_id,
            type_id: doctorData.type_id,
            phone: doctorData.phone,
            email: doctorData.email,
            address: doctorData.address,
            username: doctorData.username
        }

        Axios.post('http://localhost:3005/doctor/create-doctor', values).then((res)=>{
            console.log("rss from backend",res.data.message);
            if( res.data.message === 'Doctor created successfully'){
                dispatch(fetchDoctorInfo())
            }
            else {
                console.log("res from backend",res.data);
            }
        }).catch((error) => {
            console.error('Error during login request:', error);
        })
    };

    return (
        <div className="add-doctor-form">
            <h3>Add New Doctor</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Doctor Name:
                    <input
                        type="text"
                        name="doctor_name"
                        value={doctorData.doctor_name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Department ID:
                    <input
                        type="text"
                        name="department_id"
                        value={doctorData.department_id}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Type ID:
                    <input
                        type="text"
                        name="type_id"
                        value={doctorData.type_id}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Phone:
                    <input
                        type="text"
                        name="phone"
                        value={doctorData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={doctorData.email}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={doctorData.address}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={doctorData.username}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <div className="form-buttons">
                    <button type="submit">Save</button>

                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDoctorForm;
