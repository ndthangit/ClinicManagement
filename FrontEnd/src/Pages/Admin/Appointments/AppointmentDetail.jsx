import React, { useEffect, useState } from 'react';
import AdminNavbar from "../../Components/navbar/AdminNavbar";
import Leftbar from "../../Components/Appointment/Leftbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchAppointments, updateAppointmentStatus, updateUIAppointmentStatus } from "../../Features/AppointmentSlice";
import './AppointmentDetail.css';

const AppointmentDetail = () => {
    const dispatch = useDispatch();
    const { appointments, isLoading, isError } = useSelector((state) => state.appointment);
    const [updatedStatus, setUpdatedStatus] = useState({});
    const [searchQueries, setSearchQueries] = useState({
        appointment_id: '',
        patient_name: '',
        doctor_name: '',
        appointment_date: '',
        status: ''
    });

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    const handleStatusChange = (appointmentId, status) => {
        dispatch(updateUIAppointmentStatus({ appointmentId, status }));
        setUpdatedStatus((prevState) => ({
            ...prevState,
            [appointmentId]: status,
        }));
    };

    const handleSave = async (appointmentId) => {
        if (updatedStatus[appointmentId]) {
            dispatch(updateAppointmentStatus({ appointmentId, status: updatedStatus[appointmentId] }));
        }
    };

    const handleSearchChange = (e, column) => {
        setSearchQueries({
            ...searchQueries,
            [column]: e.target.value
        });
    };

    const filteredAppointments = appointments.filter(appointment => {
        return appointment.appointment_id.toString().includes(searchQueries.appointment_id) &&
            (appointment.patient_name ? appointment.patient_name.toLowerCase().includes(searchQueries.patient_name.toLowerCase()) : true) &&
            (appointment.doctor_name ? appointment.doctor_name.toLowerCase().includes(searchQueries.doctor_name.toLowerCase()) : true) &&
            appointment.appointment_date.includes(searchQueries.appointment_date) &&
            (appointment.status ? appointment.status.toLowerCase().includes(searchQueries.status.toLowerCase()) : true);
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading appointments</div>;
    }

    return (
        <div className='appointmentDetail dashboard'>
            <AdminNavbar className="header"/>
            <div className="body">
                <Leftbar className='leftBar'/>
                <div className="content">
                    <h2>Appointment Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Appointment ID
                                    <input
                                        type="text"
                                        value={searchQueries.appointment_id}
                                        onChange={(e) => handleSearchChange(e, 'appointment_id')}
                                    />
                                </th>
                                <th>
                                    Patient Name
                                    <input
                                        type="text"
                                        value={searchQueries.patient_name}
                                        onChange={(e) => handleSearchChange(e, 'patient_name')}
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
                                    Appointment Date
                                    <input
                                        type="text"
                                        value={searchQueries.appointment_date}
                                        onChange={(e) => handleSearchChange(e, 'appointment_date')}
                                    />
                                </th>
                                <th>
                                    Status
                                    <input
                                        type="text"
                                        value={searchQueries.status}
                                        onChange={(e) => handleSearchChange(e, 'status')}
                                    />
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.map((appointment) => (
                                <tr key={appointment.appointment_id}>
                                    <td>{appointment.appointment_id}</td>
                                    <td>{appointment.patient_name || 'N/A'}</td>
                                    <td>{appointment.doctor_name || 'N/A'}</td>
                                    <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
                                    <td>
                                        <select
                                            value={appointment.status}
                                            onChange={(e) => handleStatusChange(appointment.appointment_id, e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="completed">Completed</option>
                                            <option value="canceled">Canceled</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button className="saveButton" onClick={() => handleSave(appointment.appointment_id)}>
                                            Save
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AppointmentDetail;