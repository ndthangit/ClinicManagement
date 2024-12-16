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
import Management from "./SubPages/Management";
import Schedule from "./SubPages/Schedule";
import Services from "./SubPages/Services";
import ServicePrice from "./ServicePrice/ServicePrice";
const adminRoutes = [
    {
        path: 'admin/',
        element: <AdminHome />
    },
    {
        path: 'admin/management',
        element: <Management />
    },

    {
        path: 'admin/management/DoctorDetails',
        element: <DoctorInfo />
    },
    {
        path: 'admin/management/PatientDetails',
        element: <PatientInfo />
    },

    {
        path: 'admin/management/payments',
        element: <PaymentDetail/>
    },

    {
        path: 'admin/schedule/appointment',
        element: <AppointmentDetail />
    },
    {
        path: 'admin/schedule',
        element: <Schedule />
    },
    {
        path: 'admin/schedule/medicalexamination',
        element: <MedicalExamination/>
    },
    {
        path: 'admin/service-medicine',
        element: <Services />
    },
    {
        path: 'admin/service-price',
        element: <ServicePrice />
    },
    {
        path: 'admin/login',
        element: <AdminLogin />
    },
    {
        path:'admin/medicine',
        element: <MedicineAdmin/>
    }


];

export default adminRoutes;