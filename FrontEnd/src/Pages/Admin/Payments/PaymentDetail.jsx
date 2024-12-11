import AdminNavbar from "../../components/navbar/AdminNavbar";
import Leftbar from "../../components/leftbar/Leftbar";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from 'react';
import { fetchPayments, updatePaymentStatus, updateUIPaymentStatus } from "../../Features/PaymentSclice";
import './PaymentDetail.css';
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.min.css";
import "pikaday/css/pikaday.css";
import { registerAllModules } from "handsontable/registry";
import { FaDownload } from "react-icons/fa";

registerAllModules();

const PaymentDetail = () => {
    const hotRef = useRef(null);
    const { payments, isLoading, isError } = useSelector((state) => state.payment);
    const [updatedStatus, setUpdatedStatus] = useState({});
    const dispatch = useDispatch();
    const [editedData, setEditedData] = useState(() =>
        JSON.parse(JSON.stringify(payments))
    );

    useEffect(() => {
        dispatch(fetchPayments());
    }, [dispatch]);

    const settings = {
        licenseKey: 'non-commercial-and-evaluation',
    };

    const handleSaveRow = (rowIndex) => {
        const updatedRow = { ...editedData[rowIndex] };

        const input = {
            payment_id: updatedRow.payment_id,
            status: updatedRow.status,
        };
        console.log(input);

        dispatch(updatePaymentStatus(input));
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
                    <h2>Payment Details</h2>
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
                        colWidths={[120, 100, 150, 200, 100, 200, 100]}
                        colHeaders={[
                            "Payment ID",
                            "Exam ID",
                            "Payment Amount",
                            "Payment Date",
                            "Status",
                            "Updated At",
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
                                dateFormat: 'YYYY-MM-DD',
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
        </div>
    );
};

export default PaymentDetail;