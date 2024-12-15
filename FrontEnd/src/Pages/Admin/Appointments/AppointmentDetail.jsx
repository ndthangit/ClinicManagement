import AdminNavbar from "../../Components/navbar/AdminNavbar";
import Leftbar from "../../Components/leftbar/Leftbar";
import React, {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchAppointments } from "../../Features/AppointmentSlice";
import './AppointmentDetail.css';
import { HotTable} from "@handsontable/react";
import "handsontable/dist/handsontable.min.css";
import "pikaday/css/pikaday.css";
import {registerAllModules} from "handsontable/registry";
import {FaDownload} from "react-icons/fa";
import Axios from "axios";
import CustomSnackbar from "../DoctorInfo/CustomSnackBar";

registerAllModules();
const AppointmentDetail = () => {
    const dispatch = useDispatch();
    const hotRef = useRef(null);
    const { appointments, isLoading, isError } = useSelector((state) => state.appointment);
    const [updatedStatus, setUpdatedStatus] = useState({});
    const [snackbar, setSnackbar] = useState({ isVisible: false, message: '', severity: 'success' });

    const [editedData, setEditedData] = useState(() =>
        JSON.parse(JSON.stringify(appointments)) // Tạo bản sao sâu
    );

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    const settings = {
        licenseKey: 'non-commercial-and-evaluation',
    };
    const updateAppointmentStatus = (input) => {
        Axios.patch('http://localhost:3005/admin/updateStatusAppointment',input)
            .then((res) => {
                console.log(res.data.message);
                setSnackbar({ isVisible: true, message: res.data.message, severity: 'success' });
            })
            .catch((error) => {
                console.error('Error during the update request:', error);
                setSnackbar({ isVisible: true, message: error.message, severity: 'error' });
            });
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formattedData = editedData.map(row => ({
        ...row,
        appointment_date: formatDate(row.appointment_date)
    }));



    const handleSaveRow = (rowIndex) => {
        const updatedRow = { ...editedData[rowIndex] };

        const input = {
            appointment_id: updatedRow.appointment_id,
            status: updatedRow.status,
        };
        console.log(input);

        updateAppointmentStatus(input);
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


                    <div className="cf-title-02">
                        <div className="cf-title-alt-two">
                            <h3>Appointment Details</h3>
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
                        data={formattedData}
                        height={320}
                        width="100%"
                        colWidths={[230, 250, 250, 200, 170]}

                        colHeaders={[
                            "Bệnh nhân",
                            "Bác sĩ",
                            "Ngày",
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
                                dateFormat: 'MM/DD/YYYY',

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
            <CustomSnackbar
                isVisible={snackbar.isVisible}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar({isVisible: false, message: '', severity: 'success' })}
            />
        </div>
    );
};

export default AppointmentDetail;