import AdminNavbar from "../../Components/navbar/AdminNavbar";
import Leftbar from "../../Components/leftbar/Leftbar";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from 'react';
import { fetchPayments} from "../../Features/PaymentSclice";
import './PaymentDetail.css';
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.min.css";
import "pikaday/css/pikaday.css";
import { registerAllModules } from "handsontable/registry";
import { FaDownload } from "react-icons/fa";
import Axios from "axios";
import CustomSnackbar from "../DoctorInfo/CustomSnackBar";

registerAllModules();

const PaymentDetail = () => {
    const hotRef = useRef(null);
    const { payments, isLoading, isError } = useSelector((state) => state.payment);
    const [updatedStatus, setUpdatedStatus] = useState({});
    const dispatch = useDispatch();
    const [snackbar, setSnackbar] = useState({ isVisible: false, message: '', severity: 'success' });

    const [editedData, setEditedData] = useState(() =>
        JSON.parse(JSON.stringify(payments))
    );

    useEffect(() => {
        dispatch(fetchPayments());
    }, [dispatch]);

    const settings = {
        licenseKey: 'non-commercial-and-evaluation',
    };

    const updatePaymentStatus = (input) => {
        Axios.patch('http://localhost:3005/admin/updateStatusPayment', input)
            .then((res) => {
                // if (res.data.message === 'updated successfully') {
                //     console.log("Response from backend:", res.data.message);
                // } else {
                //     console.log("Response from backend:", res.data);
                // }
                // console.log("Update successful");
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
        payment_date: formatDate(row.payment_date),
        updated_at: formatDate(row.updated_at),
    }));


    const handleSaveRow = (rowIndex) => {
        const updatedRow = { ...editedData[rowIndex] };

        const input = {
            payment_id: updatedRow.payment_id,
            status: updatedRow.status,
        };
        console.log(input);

        // dispatch(updatePaymentStatus(input));
        updatePaymentStatus(input);
        dispatch(fetchPayments());

        setUpdatedStatus((prevState) => ({
            ...prevState,
            [updatedRow.payment_id]: updatedRow.status,
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
            filename: 'Payment-file_[YYYY]-[MM]-[DD]',
            mimeType: 'text/csv',
            rowDelimiter: '\r\n',
            rowHeaders: true,
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading payments</div>;
    }

    return (
        <div className='payment dashboard'>
            <AdminNavbar className="header"/>
            <div className="body">
                <Leftbar className='leftBar'/>
                <div className="content">
                    <div className="cf-title-02">
                        <div className="cf-title-alt-two">
                            <h3>Payment Details</h3>
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
                        colWidths={[120, 100, 150, 230, 150, 230, 120]}
                        colHeaders={[
                            "Mã hóa đơn",
                            "Mã kiểm tra",
                            "Tổng tiền",
                            "Ngày xuất hóa đơn",
                            "Status",
                            "Ngày cập nhật",
                            "Actions",
                        ]}
                        columns={[
                            {
                                data: "payment_id",
                                readOnly: true
                            },
                            {
                                data: "exam_id",
                                readOnly: true
                            },
                            {
                                data: "payment_amount",
                                readOnly: true
                            },
                            {
                                type: 'date',
                                data: "payment_date",
                                readOnly: true
                            },
                            {
                                data: "status",
                                type: 'dropdown',
                                source: [
                                    'pending',
                                    'completed',
                                    'failed',
                                ],
                            },
                            {
                                type: 'date',
                                data: "updated_at",
                                readOnly: true
                            },
                            {
                                data: () => "",
                                renderer: (instance, td, row) => {
                                    td.className = "payment-actions-column";
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
                    />
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

export default PaymentDetail;