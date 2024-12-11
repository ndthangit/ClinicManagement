import AdminLogin from './Login/AdminLogin';
import AdminHome from "./AdminHome";
import React from "react";
import PaymentDetail from "./Payments/PaymentDetail";
import AppointmentDetail from "./Appointments/AppointmentDetail";
import ServicePriceAdmin from './ServicePrice/ServicePrice';
import MedicineAdmin from './Medicine/Medicine'
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
    },
    {
        path:'admin/service_price',
        element: <ServicePriceAdmin/>
    },
    {
        path:'admin/medicine',
        element: <MedicineAdmin/>
    }

];

export default adminRoutes;