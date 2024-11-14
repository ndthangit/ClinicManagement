import React, { useEffect, useState } from 'react';
import AdminNavbar from "../../Components/navbar/AdminNavbar";
import Leftbar from "../../Components/Appointment/Leftbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchAppointments } from "../../Features/AppointmentSlice";
import './AppointmentDetail.css';
import Axios from "axios";

const AppointmentDetail = () => {
    const dispatch = useDispatch();
    const { appointments, isLoading, isError } = useSelector((state) => state.appointment);
    const [updatedStatus, setUpdatedStatus] = useState({});

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    const handleStatusChange = (appointmentId, status) => {
        setUpdatedStatus((prevState) => ({
            ...prevState,
            [appointmentId]: status,
        }));
    };

    const handleSave = async (appointmentId) => {
        if (updatedStatus[appointmentId]) {
            try {
                await Axios.patch(`/api/appointments/${appointmentId}`, { status: updatedStatus[appointmentId] });
                // dispatch(updateAppointmentStatus({ appointmentId, status: updatedStatus[appointmentId] }));
            } catch (error) {
                console.error('Failed to update appointment status', error);
            }
        }
    };

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
                                <th>Appointment ID</th>
                                <th>Patient Name</th>
                                <th>Doctor Name</th>
                                <th>Appointment Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.appointment_id}>
                                    <td>{appointment.appointment_id}</td>
                                    <td>{appointment.patient_name || 'N/A'}</td>
                                    <td>{appointment.doctor_name || 'N/A'}</td>
                                    <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
                                    <td>
                                        <select
                                            value={updatedStatus[appointment.appointment_id] || appointment.status}
                                            onChange={(e) => handleStatusChange(appointment.appointment_id, e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="completed">Completed</option>
                                            <option value="canceled">Canceled</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => handleSave(appointment.appointment_id)}>
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