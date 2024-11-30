import React, { useEffect, useState } from 'react';
import AdminNavbar from "../../Components/navbar/AdminNavbar";
import Leftbar from "../../Components/Appointment/Leftbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatientInfo } from "../../Features/PatientInforSlice";
import './PatientInfo.css';

const PatientInfo = () => {
    const dispatch = useDispatch();
    const { patientInfo, isLoading, isError } = useSelector((state) => state.patientInfo);
    const [searchQueries, setSearchQueries] = useState({
        patient_id: '',
        patient_name: '',
        date_of_birth: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        cccd: '',
        registration_date: ''
    });

    useEffect(() => {
        dispatch(fetchPatientInfo());
    }, [dispatch]);

    const handleSearchChange = (e, column) => {
        setSearchQueries({
            ...searchQueries,
            [column]: e.target.value
        });
    };

    const filteredPatients = patientInfo.filter(patient => {
        return patient.patient_id.toString().includes(searchQueries.patient_id) &&
            patient.patient_name.toLowerCase().includes(searchQueries.patient_name.toLowerCase()) &&
            patient.date_of_birth.includes(searchQueries.date_of_birth) &&
            patient.gender.toLowerCase().includes(searchQueries.gender.toLowerCase()) &&
            patient.phone.includes(searchQueries.phone) &&
            patient.email.toLowerCase().includes(searchQueries.email.toLowerCase()) &&
            patient.address.toLowerCase().includes(searchQueries.address.toLowerCase()) &&
            patient.cccd.includes(searchQueries.cccd) &&
            patient.registration_date.includes(searchQueries.registration_date);
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading patient data</div>;
    }

    return (
        <div className='patientInfo dashboard'>
            <AdminNavbar className="header"/>
            <div className="body">
                <Leftbar className='leftBar'/>
                <div className="content">
                    <h2>Patient Information</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Patient ID
                                    <input
                                        type="text"
                                        value={searchQueries.patient_id}
                                        onChange={(e) => handleSearchChange(e, 'patient_id')}
                                    />
                                </th>
                                <th>
                                    Name
                                    <input
                                        type="text"
                                        value={searchQueries.patient_name}
                                        onChange={(e) => handleSearchChange(e, 'patient_name')}
                                    />
                                </th>
                                <th>
                                    Date of Birth
                                    <input
                                        type="text"
                                        value={searchQueries.date_of_birth}
                                        onChange={(e) => handleSearchChange(e, 'date_of_birth')}
                                    />
                                </th>
                                <th>
                                    Gender
                                    <input
                                        type="text"
                                        value={searchQueries.gender}
                                        onChange={(e) => handleSearchChange(e, 'gender')}
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
                                    CCCD
                                    <input
                                        type="text"
                                        value={searchQueries.cccd}
                                        onChange={(e) => handleSearchChange(e, 'cccd')}
                                    />
                                </th>
                                <th>
                                    Registration Date
                                    <input
                                        type="text"
                                        value={searchQueries.registration_date}
                                        onChange={(e) => handleSearchChange(e, 'registration_date')}
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((patient) => (
                                <tr key={patient.patient_id}>
                                    <td>{patient.patient_id}</td>
                                    <td>{patient.patient_name}</td>
                                    <td>{new Date(patient.date_of_birth).toLocaleDateString()}</td>
                                    <td>{patient.gender}</td>
                                    <td>{patient.phone}</td>
                                    <td>{patient.email}</td>
                                    <td>{patient.address}</td>
                                    <td>{patient.cccd}</td>
                                    <td>{new Date(patient.registration_date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PatientInfo;