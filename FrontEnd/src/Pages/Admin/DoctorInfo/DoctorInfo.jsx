import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AdminNavbar from "../../components/navbar/AdminNavbar";
import Leftbar from "../../components/leftbar/Leftbar";
import './DoctorInfo.css';
import {HotTable, HotColumn} from "@handsontable/react";
import "handsontable/dist/handsontable.min.css";
import "pikaday/css/pikaday.css";
import {registerAllModules} from "handsontable/registry";
import {
    fetchDoctorInfo,
    showFormAddDoctor,
} from "../../Features/DoctorInforSlice";
import AddDoctorForm from "./AddDoctorForm";
import {IoIosAddCircle} from "react-icons/io";
import { FaDownload } from "react-icons/fa";
import ConfirmBox from "./ConfirmBox";
import axios from "axios";
import CustomSnackbar from "./CustomSnackBar";

registerAllModules();

const DoctorInfo = () => {
    const dispatch = useDispatch();
    const hotRef = useRef(null);
    const {doctorInfo, isLoading, isError, showAddForm} = useSelector((state) => state.doctorInfo);
    const [editableRows, setEditableRows] = useState({});
    const [editedData, setEditedData] = useState(() =>
        JSON.parse(JSON.stringify(doctorInfo)) // Tạo bản sao sâu
    );

    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [rowToDelete, setRowToDelete] = useState(null);
    const [snackbar, setSnackbar] = useState({ isVisible: false, message: '', severity: 'success' });

    const settings = {
        licenseKey: 'non-commercial-and-evaluation',
    };

    useEffect(() => {
        setEditedData(JSON.parse(JSON.stringify(doctorInfo))); // Đồng bộ lại với Redux
    }, [doctorInfo]);


    const toggleEditRow = (rowIndex) => {
        setEditableRows((prev) => ({
            ...prev,
            [rowIndex]: !prev[rowIndex],
        }));
    };

    const updateDoctorInfoT = async (doctorInfo) => {
        try {
            const response = await axios.patch('http://localhost:3005/doctor/update-doctor', doctorInfo);
            return response.data;
        } catch (error) {
            console.error("Error updating doctor info:", error);
            throw error; // Để ném lỗi ra ngoài nếu cần
        }
    };

    const deleteDoctorInfo = async (doctorID) => {
        try {
            const response = await axios.delete(`http://localhost:3005/doctor/delete-doctor/${doctorID}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting doctor info:", error);
            throw error; // Để ném lỗi ra ngoài nếu c
        }
    };

    const handleSaveRow = async (rowIndex) => {
        const updatedRow = {...editedData[rowIndex]};

        const input = {
            doctor_id: updatedRow.doctor_id,
            doctor_name: updatedRow.doctor_name,
            department_id: updatedRow.department_id,
            type_id: updatedRow.type_id,
            phone: updatedRow.phone,
            email: updatedRow.email,
            address: updatedRow.address,
            username: updatedRow.username,

        }
        // console.log("input",input);
        dispatch(fetchDoctorInfo());

        try {
            const output = await updateDoctorInfoT(input);
            console.log("output", output.message);
            setSnackbar({
                isVisible: true,
                message: output.message ,
                severity: "success"
            });
            toggleEditRow(rowIndex);
        } catch (error) {
            setSnackbar({
                isVisible: true,
                message: "Failed to update doctor info.",
                severity: "error"
            });
        }
    };


    const handleCancelRow = (rowIndex) => {
        const updatedData = [...editedData];
        updatedData[rowIndex] = {...doctorInfo[rowIndex]}; // Khôi phục dữ liệu gốc
        setEditedData(updatedData);
        toggleEditRow(rowIndex);
    };

    const handleDeleteDoctor = () => {
        if (rowToDelete !== null) {
            // Thực hiện xóa doctor
            console.log(`Deleting doctor at row ${rowToDelete}`);
            const deletedRow = {...editedData[rowToDelete]};
            // dispatch(deleteDoctor({doctor_id:deletedRow.doctor_id}));

            try {
                const output = deleteDoctorInfo(deletedRow.doctor_id);
                console.log("output", output.message);
                setSnackbar({
                    isVisible: true,
                    message: "Doctor deleted successfully",
                    severity: "success"
                });
            } catch (error) {
                setSnackbar({
                    isVisible: true,
                    message: "Failed to delete doctor.",
                    severity: "error"
                });
            }

            dispatch(fetchDoctorInfo());
            setRowToDelete(null); // Reset row để tránh lỗi
        }
        setShowConfirmBox(false);
    };

    const handleDeleteClick = (rowIndex) => {
        setRowToDelete(rowIndex);
        setShowConfirmBox(true); // Hiển thị ConfirmBox
    };

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
            filename: 'Doctors-file_[YYYY]-[MM]-[DD]',
            mimeType: 'text/csv',
            rowDelimiter: '\r\n',
            rowHeaders: true,
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading doctor data</div>;
    }

    return (
        <div className="doctorsInfo dashboard">
            <AdminNavbar className="header"/>
            <div className="body">
                <Leftbar className='leftBar'/>
                <div className="content">
                    <h2>Doctor Information</h2>
                    <div className="extraButton">
                        <button className="buttonShowAddDoctorForm" onClick={() => dispatch(showFormAddDoctor())}>
                            <IoIosAddCircle/>Add Doctor
                        </button>

                        {showAddForm && (
                            <div className="modal-overlay">
                                <AddDoctorForm/>
                                {/*<div className="modal-content">*/}
                                {/*    <AddDoctorForm/>*/}
                                {/*</div>*/}
                            </div>
                        )}

                        <button id="export-file" className="buttonExportCSV" onClick={() => buttonClickCallback()}>
                            <FaDownload />
                            Export CSV
                        </button>
                    </div>


                    <HotTable
                        ref={hotRef}
                        settings={settings}
                        data={editedData}
                        height={540}
                        width="100%"
                        colWidths={[150, 170, 150, 120, 230, 110, 160]}
                        colHeaders={[
                            "Họ tên",
                            "Khoa",
                            "Chức vụ",
                            "SDT",
                            "email",
                            // "address",
                            "username",
                            "Actions", // Gộp hai cột thành một
                        ]}
                        dropdownMenu={true}
                        hiddenColumns={{
                            indicators: true,
                        }}
                        contextMenu={true}
                        rowHeights={25}
                        multiColumnSorting={true}
                        filters={true}
                        rowHeaders={true}
                        autoWrapCol={true}
                        autoWrapRow={true}
                        cells={(row) => ({
                            readOnly: !editableRows[row],
                            className: 'htMiddle htCenter',
                        })}

                        afterChange={(changes, source) => {
                            if (source === "edit") {
                                changes.forEach(([row, prop, oldValue, newValue]) => {
                                    setEditedData((prevData) => {
                                        const updatedData = [...prevData];
                                        updatedData[row] = {...updatedData[row], [prop]: newValue};
                                        return updatedData;
                                    });
                                });
                            }
                        }}
                    >
                        <HotColumn data="doctor_name" className="htCenter"/>
                        <HotColumn data="department_name" className="htCenter"/>
                        <HotColumn data="type_name" className="htCenter"/>

                        <HotColumn data="phone" className="htCenter"/>
                        <HotColumn data="email" className="htCenter"/>
                        <HotColumn data="username" className="htCenter"/>
                        <HotColumn
                            data={() => ""}
                            renderer={(instance, td, row) => {
                                td.className = "actions-column"; // Thêm lớp cho cột actions
                                td.style.height = "100%";
                                if (editableRows[row]) {
                                    td.innerHTML = `
                                                        <button class="save-btn">Save</button>
                                                        <button class="cancel-btn">Cancel</button>             
                                                    `;
                                    td.querySelector(".save-btn").onclick = () => handleSaveRow(row);
                                    td.querySelector(".cancel-btn").onclick = () => handleCancelRow(row);
                                } else {
                                    td.innerHTML = `
                                                        <button class="edit-btn">Edit</button>
                                                        <button class="delete-btn">Delete</button>`;
                                    td.querySelector(".edit-btn").onclick = () => toggleEditRow(row);
                                    td.querySelector(".delete-btn").onclick = () => handleDeleteClick(row);
                                }
                            }}
                            readOnly={true}
                            editor={false}
                        />
                    </HotTable>

                </div>
            </div>
            <CustomSnackbar
                isVisible={snackbar.isVisible}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar({ isVisible: false, message: '', severity: 'success' })}
            />

            {showConfirmBox && (
                <ConfirmBox
                    message="Are you sure you want to delete this doctor?"
                    onConfirm={handleDeleteDoctor}
                    onCancel={() => setShowConfirmBox(false)}
                />
            )}
        </div>
    );
};

export default DoctorInfo;
