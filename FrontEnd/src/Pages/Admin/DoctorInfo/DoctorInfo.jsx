import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminNavbar from "../../Components/navbar/AdminNavbar";
import Leftbar from "../../Components/Appointment/Leftbar";
import './DoctorInfo.css';
import AddDoctorForm from "./AddDoctorForm";
const DoctorInfo = () => {
    const dispatch = useDispatch();
    const { doctorInfo, isLoading, isError } = useSelector((state) => state.doctorInfo);
    const [updatedStatus, setUpdatedStatus] = useState({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchQueries, setSearchQueries] = useState({
        doctor_id: '',
        doctor_name: '',
        department_id: '',
        type_id: '',
        phone: '',
        email: '',
        address: '',
        username: '',
    });

    useEffect(() => {
        // dispatch(fetchDoctorInfo());
    }, [dispatch]);

    const handleStatusChange = (doctor_id, status) => {
        setUpdatedStatus((prevState) => ({
            ...prevState,
            [doctor_id]: status,
        }));
    };
    const handleSaveDoctor = (newDoctor) => {
        console.log('New Doctor:', newDoctor);
        // TODO: Gửi dữ liệu `newDoctor` đến server hoặc cập nhật Redux
        setShowAddForm(false);
    };

    const handleSearchChange = (e, column) => {
        setSearchQueries({
            ...searchQueries,
            [column]: e.target.value
        });
    };

    const handleSave = async (doctor_id) => {
        if (updatedStatus[doctor_id]) {
            // dispatch(updateAppointmentStatus({ appointmentId, status: updatedStatus[appointmentId] }));
        }
    };

    const filteredDoctors = doctorInfo.filter(doctor => {
        return doctor.doctor_id.toString().includes(searchQueries.doctor_id) &&
            (doctor.doctor_name ? doctor.doctor_name.toLowerCase().includes(searchQueries.doctor_name.toLowerCase()) : true) &&
            (doctor.department_id ? doctor.department_id.toString().includes(searchQueries.department_id) : true) &&
            (doctor.type_id ? doctor.type_id.toString().includes(searchQueries.type_id) : true) &&
            (doctor.phone ? doctor.phone.includes(searchQueries.phone) : true) &&
            (doctor.email ? doctor.email.toLowerCase().includes(searchQueries.email.toLowerCase()) : true) &&
            (doctor.address ? doctor.address.toLowerCase().includes(searchQueries.address.toLowerCase()) : true) &&
            (doctor.username ? doctor.username.includes(searchQueries.username) : true);
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading doctor data</div>;
    }

    return (
        <div className="doctorInfo dashboard">
            <AdminNavbar className="header" />
            <div className="body">
                <Leftbar className='leftBar'/>
                <div className="content">
                    <h2>Doctor Information</h2>

                    <table>
                        <thead>
                        <tr>
                            <th>
                                Doctor ID
                                <input
                                    type="text"
                                    value={searchQueries.doctor_id}
                                    onChange={(e) => handleSearchChange(e, 'doctor_id')}
                                />
                            </th>
                            <th>
                                Doctor Name
                                <input
                                    type="text"
                                    value={searchQueries.doctor_name}
                                    onChange={(e) => handleSearchChange(e, 'doctor_name')}
                                />
                            </th>
                            <th>
                                Department ID
                                <input
                                    type="text"
                                    value={searchQueries.department_id}
                                    onChange={(e) => handleSearchChange(e, 'department_id')}
                                />
                            </th>
                            <th>
                                Type ID
                                <input
                                    type="text"
                                    value={searchQueries.type_id}
                                    onChange={(e) => handleSearchChange(e, 'type_id')}
                                />
                            </th>
                            <th>
                                Phone
                                <input
                                    type="text"
                                    value={searchQueries.phone}
                                    onChange={(e) => handleSearchChange(e, 'phone')}
                                />
                            </th>
                            <th>
                                Email
                                <input
                                    type="text"
                                    value={searchQueries.email}
                                    onChange={(e) => handleSearchChange(e, 'email')}
                                />
                            </th>
                            <th>
                                Address
                                <input
                                    type="text"
                                    value={searchQueries.address}
                                    onChange={(e) => handleSearchChange(e, 'address')}
                                />
                            </th>
                            <th>
                                username
                                <input
                                    type="text"
                                    value={searchQueries.username}
                                    onChange={(e) => handleSearchChange(e, 'username')}
                                />
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredDoctors.map((doctor) => (
                            <tr key={doctor.doctor_id}>
                                <td>{doctor.doctor_id}</td>
                                <td>{doctor.doctor_name}</td>
                                <td>{doctor.department_id}</td>
                                <td>{doctor.type_id}</td>
                                <td>{doctor.phone}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.address}</td>
                                <td>{doctor.username}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>


            </div>
            <button onClick={() => setShowAddForm(true)}>Add Doctor</button>
            {showAddForm && (
                <AddDoctorForm
                    onSave={handleSaveDoctor}
                    onCancel={() => setShowAddForm(false)}
                />
            )}
        </div>
    );
};

export default DoctorInfo;