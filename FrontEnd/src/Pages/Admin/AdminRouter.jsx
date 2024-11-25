import AdminLogin from './Login/AdminLogin';
import AdminHome from "./AdminHome";
import React from "react";
import PaymentDetail from "./Payments/PaymentDetail";
import AppointmentDetail from "./Appointments/AppointmentDetail";

const adminRoutes = [
    {
        path: 'admin/',
        element: <AdminHome />
    },
    {
        path: 'admin/login',
        element: <AdminLogin />
    },
    {
        path: 'admin/appointment',
        element: <AppointmentDetail />
    },
    {
        path: 'admin/payments',
        element: <PaymentDetail/>
    }

];

export default adminRoutes;