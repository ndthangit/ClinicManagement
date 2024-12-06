import AdminLogin from './Login/AdminLogin';
import AdminHome from "./AdminHome";
import React from "react";
import PaymentDetail from "./Payments/PaymentDetail";
import AppointmentDetail from "./Appointments/AppointmentDetail";
import DoctorInfo from "./DoctorInfo/DoctorInfo";
import PatientInfo from "./PatientInfo/PatientInfo";
import ExampleComponent from "./ExampleComponent";
import ErrorBoundary from "./ErrorBoundary";

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
        path: 'admin/DoctorDetails',
        element: <DoctorInfo />
    },
    {
        path: 'admin/PatientDetails',
        element: <PatientInfo />
    },
    {
        path: 'admin/test',
        element:<ExampleComponent/>
    },
    {
        path: 'admin/payments',
        element: <PaymentDetail/>
    }


];

export default adminRoutes;