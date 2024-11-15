import React, { useEffect, useState } from 'react';
import AdminNavbar from "../../Components/navbar/AdminNavbar";
import Leftbar from "../../Components/Appointment/Leftbar";
import { useDispatch, useSelector } from "react-redux";
import './PaymentDetail.css';
import {
    fetchPayments,
    updatePaymentStatus,
    updateUIPaymentStatus
} from "../../Features/PaymentSclice";

let PaymentDetail = () => {
    const { payments , isLoading, isError } = useSelector((state) => state.payment);
    const [updatedStatus, setUpdatedStatus] = useState({});
    const [searchQueries, setSearchQueries] = useState({
        payment_id: '',
        exam_id: '',
        payment_amount: '',
        payment_date_start: '',
        payment_date_end: '',
        status: '',
        updated_at: ''
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPayments());
    }, [dispatch]);

    const handleStatusChange = (paymentId, status) => {
        // dispatch(updatePaymentStatusBeforeSave({ paymentId, status}));
        dispatch(updateUIPaymentStatus({ paymentId, status: updatedStatus[paymentId] }));

        setUpdatedStatus((prevState) => ({
            ...prevState,
            [paymentId]: status,
        }));
    };

    const handleSave = (paymentId) => {
        if (updatedStatus[paymentId]) {
            dispatch(updatePaymentStatus({ paymentId, status: updatedStatus[paymentId] }));
        }
    };

    const handleSearchChange = (e, column) => {
        setSearchQueries({
            ...searchQueries,
            [column]: e.target.value
        });
    };

    const filteredPayments = payments.filter(payment => {
        const paymentDate = new Date(payment.payment_date);
        const startDate = searchQueries.payment_date_start ? new Date(searchQueries.payment_date_start) : null;
        const endDate = searchQueries.payment_date_end ? new Date(searchQueries.payment_date_end) : null;

        return payment.payment_id.toString().includes(searchQueries.payment_id) &&
            payment.exam_id.toString().includes(searchQueries.exam_id) &&
            payment.payment_amount.toString().includes(searchQueries.payment_amount) &&
            (!startDate || paymentDate >= startDate) &&
            (!endDate || paymentDate <= endDate) &&
            (searchQueries.status === '' || payment.status === searchQueries.status) &&
            payment.updated_at.includes(searchQueries.updated_at);
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading appointments</div>;
    }

    return (
        <div className='payment dashboard'>
            <AdminNavbar className="header"/>
            <div className="body">
                <Leftbar className='leftBar'/>
                <div className="content">
                    <h2>Payment Details</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>
                                Payment ID
                                <input
                                    type="text"
                                    value={searchQueries.payment_id}
                                    onChange={(e) => handleSearchChange(e, 'payment_id')}
                                />
                            </th>
                            <th>
                                Exam ID
                                <input
                                    type="text"
                                    value={searchQueries.exam_id}
                                    onChange={(e) => handleSearchChange(e, 'exam_id')}
                                />
                            </th>
                            <th>
                                Payment Amount
                                <input
                                    type="text"
                                    value={searchQueries.payment_amount}
                                    onChange={(e) => handleSearchChange(e, 'payment_amount')}
                                />
                            </th>
                            <th>
                                Payment Date
                                <input
                                    type="date"
                                    value={searchQueries.payment_date_start}
                                    onChange={(e) => handleSearchChange(e, 'payment_date_start')}
                                />
                                <input
                                    type="date"
                                    value={searchQueries.payment_date_end}
                                    onChange={(e) => handleSearchChange(e, 'payment_date_end')}
                                />
                            </th>
                            <th>
                                Status
                                <select
                                    value={searchQueries.status}
                                    onChange={(e) => handleSearchChange(e, 'status')}
                                >
                                    <option value="">All</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="failed">Failed</option>
                                </select>
                            </th>
                            <th>
                                Updated At
                                <input
                                    type="text"
                                    value={searchQueries.updated_at}
                                    onChange={(e) => handleSearchChange(e, 'updated_at')}
                                />
                            </th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.map((payment) => (
                                <tr key={payment.payment_id}>
                                    <td>{payment.payment_id}</td>
                                    <td>{payment.exam_id}</td>
                                    <td>{payment.payment_amount}</td>
                                    <td>{payment.payment_date}</td>
                                    <td>
                                        <select
                                            value={payment.status}
                                            onChange={(e) => handleStatusChange(payment.payment_id, e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="completed">Completed</option>
                                            <option value="failed">Failed</option>
                                        </select>
                                    </td>
                                    <td>{payment.updated_at}</td>
                                    <td>
                                        <button className="saveButton" onClick={() => handleSave(payment.payment_id)}>Save</button>
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

export default PaymentDetail;