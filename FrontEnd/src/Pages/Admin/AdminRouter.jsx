import AdminLogin from './Login/AdminLogin';
import AdminHome from "./AdminHome";
import React from "react";
import PaymentDetail from "./Payments/PaymentDetail";
import AppointmentDetail from "./Appointments/AppointmentDetail";
import DoctorInfo from "./DoctorInfo/DoctorInfo";
import PatientInfo from "./PatientInfo/PatientInfo";
import MedicalExamination from './MedicalExamination/MedicalExamination';

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
        path: 'admin/DoctorDetails',
        element: <DoctorInfo />
    },
    {
        path: 'admin/PatientDetails',
        element: <PatientInfo />
    },

    {
        path: 'admin/payments',
        element: <PaymentDetail/>
    },
    {
        path: 'admin/medicalexamination',
        element: <MedicalExamination/>
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