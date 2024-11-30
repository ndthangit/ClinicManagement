import React, { useState } from 'react';
import './AddDoctorForm.css';
import {useDispatch} from "react-redux";

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
