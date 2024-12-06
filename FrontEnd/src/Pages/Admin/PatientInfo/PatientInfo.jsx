import React, { useEffect, useState } from 'react';
import AdminNavbar from "../../Components/navbar/AdminNavbar";
import Leftbar from "../../Components/Appointment/Leftbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatientInfo } from "../../Features/PatientInforSlice";
import './PatientInfo.css';
import { HotTable, HotColumn } from "@handsontable/react";
import "handsontable/dist/handsontable.min.css";
import "pikaday/css/pikaday.css";

const PatientInfo = () => {
    const dispatch = useDispatch();
    const { patientInfo, isLoading, isError } = useSelector((state) => state.patientInfo);
    const settings = {
        licenseKey: 'non-commercial-and-evaluation',
    }


    useEffect(() => {
        dispatch(fetchPatientInfo());
    }, [dispatch]);

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

                    <HotTable
                        settings={settings}
                        data ={patientInfo}
                        height={450}
                        colWidths={[170, 156, 150, 230, 130, 120, 120]}
                        colHeaders={[
                            "Name",
                            "Gender",
                            "Phone",
                            "Email",
                            "Address",
                            "CCCD",
                        ]}

                        dropdownMenu={true}
                        hiddenColumns={{
                            indicators: true,
                        }}
                        contextMenu={true}
                        multiColumnSorting={true}
                        filters={true}
                        rowHeaders={true}
                        autoWrapCol={true}
                        autoWrapRow={true}
                    >
                        <HotColumn data="patient_name" className="htCenter"/>
                        <HotColumn data="gender" className="htCenter" />
                        <HotColumn data="phone" className="htCenter"/>
                        <HotColumn data="email" className="htCenter"/>
                        <HotColumn data="address" className="htCenter"/>
                        <HotColumn data="cccd" className="htCenter" />
                    </HotTable>
                </div>
            </div>
        </div>
    );
};

export default PatientInfo;