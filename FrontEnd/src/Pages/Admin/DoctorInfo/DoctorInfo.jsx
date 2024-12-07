import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AdminNavbar from "../../Components/navbar/AdminNavbar";
import Leftbar from "../../Components/Appointment/Leftbar";
import './DoctorInfo.css';
import {HotTable, HotColumn} from "@handsontable/react";
import "handsontable/dist/handsontable.min.css";
import "pikaday/css/pikaday.css";
import {registerAllModules} from "handsontable/registry";
import {
    deleteDoctor,
    fetchDoctorInfo,
    showFormAddDoctor,
    updateDoctorUI,
    updateInfoDoctor
} from "../../Features/DoctorInforSlice";
import AddDoctorForm from "./AddDoctorForm";
import {IoIosAddCircle} from "react-icons/io";
import { FaDownload } from "react-icons/fa";
import ConfirmBox from "./ConfirmBox";

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

    const handleSaveRow = (rowIndex) => {
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
        dispatch(updateDoctorUI(input));
        dispatch(updateInfoDoctor(input));

        // Tắt chế độ chỉnh sửa cho dòng hiện tại
        toggleEditRow(rowIndex);
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
            dispatch(deleteDoctor({doctor_id:deletedRow.doctor_id}));
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
                                <div className="modal-content">
                                    <AddDoctorForm/>
                                </div>
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
                        height={320}
                        width="100%"
                        colWidths={[170, 150, 100, 150, 230, 120, 160]}
                        colHeaders={[
                            "doctor_name",
                            "department_id",
                            "type_id",
                            "phone",
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
                        <HotColumn data="department_id" className="htCenter"/>
                        <HotColumn data="type_id" className="htCenter"/>
                        <HotColumn data="phone" className="htCenter"/>
                        <HotColumn data="email" className="htCenter"/>
                        {/*<HotColumn data="address" className="htCenter"/>*/}
                        <HotColumn data="username" className="htCenter"/>
                        <HotColumn
                            data={() => ""}
                            renderer={(instance, td, row) => {
                                // Hiển thị nút dựa trên trạng thái chỉnh sửa
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
                        />
                    </HotTable>

                </div>
            </div>
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
