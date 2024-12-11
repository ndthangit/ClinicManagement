import AdminNavbar from "../../components/navbar/AdminNavbar";
import Leftbar from "../../components/leftbar/Leftbar";
import React, {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchAppointments, updateAppointmentStatus, updateUIAppointmentStatus } from "../../Features/AppointmentSlice";
import './AppointmentDetail.css';
import {HotColumn, HotTable} from "@handsontable/react";
import "handsontable/dist/handsontable.min.css";
import "pikaday/css/pikaday.css";
import {registerAllModules} from "handsontable/registry";
import {FaDownload} from "react-icons/fa";

registerAllModules();
const AppointmentDetail = () => {
    const dispatch = useDispatch();
    const hotRef = useRef(null);
    const { appointments, isLoading, isError } = useSelector((state) => state.appointment);
    const [updatedStatus, setUpdatedStatus] = useState({});
    const [editedData, setEditedData] = useState(() =>
        JSON.parse(JSON.stringify(appointments)) // Tạo bản sao sâu
    );

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    const settings = {
        licenseKey: 'non-commercial-and-evaluation',
    };

    const handleSaveRow = (rowIndex) => {
        const updatedRow = { ...editedData[rowIndex] };

        const input = {
            appointment_id: updatedRow.appointment_id,
            status: updatedRow.status,
        };
        console.log(input);

        // dispatch(updateUIAppointmentStatus(input));
        dispatch(updateAppointmentStatus(input));
        dispatch(fetchAppointments());

        setUpdatedStatus((prevState) => ({
            ...prevState,
            [updatedRow.appointment_id]: updatedRow.status,
        }));
    }
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
            filename: 'Appointment-file_[YYYY]-[MM]-[DD]',
            mimeType: 'text/csv',
            rowDelimiter: '\r\n',
            rowHeaders: true,
        });
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
                    <div className="extraButton">
                        <button id="export-file" className="buttonExportCSV" onClick={() => buttonClickCallback()}>
                            <FaDownload/>
                            Export CSV
                        </button>
                    </div>
                    <HotTable
                        ref={hotRef}
                        settings={settings}
                        data={editedData}
                        height={320}
                        width="100%"
                        colWidths={[170, 150, 200, 150, 100]}

                        colHeaders={[
                            "Patient Name",
                            "Doctor Name",
                            "Appointment Date",
                            "Status",
                            "Actions",
                        ]}
                        columns={[
                            {
                                data: "patient_name",
                                readOnly: true
                            },
                            {
                                data: "doctor_name",
                                readOnly: true
                            },
                            {
                                type: 'date',
                                data: "appointment_date",
                                readOnly: true
                            },
                            {
                                data: "status",
                                type: 'dropdown',
                                source: [
                                    'completed',
                                    'confirmed',
                                    'failed',
                                ],
                            },
                            {

                                data: () => "",
                                renderer: (instance, td, row) => {
                                    td.className = "appointment-actions-column";
                                    td.style.height = "100%";
                                    td.innerHTML = `<button class="save-btn">Save</button>`;
                                    td.querySelector(".save-btn").onclick = () => handleSaveRow(row);
                                },
                                readOnly: true
                            }
                        ]}
                        dropdownMenu={true}
                        hiddenColumns={{
                            indicators: true,
                        }}
                        contextMenu={true}
                        rowHeights={20}
                        multiColumnSorting={true}
                        filters={true}
                        rowHeaders={true}
                        autoWrapCol={true}
                        autoWrapRow={true}

                        cells={() => ({
                            className: 'htMiddle htCenter',
                        })}

                    >

                    </HotTable>


                </div>
            </div>
        </div>
    );
};

export default AppointmentDetail;