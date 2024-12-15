import React, {useEffect, useRef, useState} from 'react';
import AdminNavbar from "../../Components/navbar/AdminNavbar";
import Leftbar from "../../Components/leftbar/Leftbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatientInfo } from "../../Features/PatientInforSlice";
import './PatientInfo.css';
import { HotTable, HotColumn } from "@handsontable/react";
import "handsontable/dist/handsontable.min.css";
import "pikaday/css/pikaday.css";
import {FaDownload} from "react-icons/fa";

const PatientInfo = () => {
    const hotRef = useRef(null);
    const dispatch = useDispatch();
    const { patientInfo, isLoading, isError } = useSelector((state) => state.patientInfo);
    const settings = {
        licenseKey: 'non-commercial-and-evaluation',
    }


    useEffect(() => {
        dispatch(fetchPatientInfo());
    }, [dispatch]);

    const buttonClickCallback = () => {
        const hot = hotRef.current?.hotInstance;
        const exportPlugin = hot?.getPlugin('exportFile');

        exportPlugin?.downloadFile('csv', {
            bom: false,
            columnDelimiter: ',',
            columnHeaders: false,
            exportHiddenColumns: true,
            exportHiddenRows: true,
            fileExtension: 'csv',
            filename: 'Patient-file_[YYYY]-[MM]-[DD]',
            mimeType: 'text/csv',
            rowDelimiter: '\r\n',
            rowHeaders: true,
        });
    };

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
                    {/*<h2>Patient Information</h2>*/}
                    <div className="cf-title-02">
                        <div className="cf-title-alt-two">
                            <h3>Patient Information</h3>
                        </div>
                    </div>
                    <div className="extraButton">
                        <button id="export-file" className="buttonExportCSV" onClick={() => buttonClickCallback()}>
                            <FaDownload/>
                            Export CSV
                        </button>
                    </div>
                    <HotTable
                        ref={hotRef}
                        settings={settings}
                        data={patientInfo}
                        height={450}
                        colWidths={[170, 120, 150, 230, 280, 150]}
                        colHeaders={[
                            "Tên",
                            "Giới tính",
                            "SDT",
                            "Email",
                            "Địa chỉ",
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
                        readOnly={true}
                    >
                        <HotColumn data="patient_name" className="htCenter"/>
                        <HotColumn data="gender" className="htCenter"/>
                        <HotColumn data="phone" className="htCenter"/>
                        <HotColumn data="email" className="htCenter"/>
                        <HotColumn data="address" className="htCenter"/>
                        <HotColumn data="cccd" className="htCenter"/>

                    </HotTable>
                </div>
            </div>
        </div>
    );
};

export default PatientInfo;