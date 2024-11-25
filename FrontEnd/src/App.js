// import logo from './logo.svg';
import './App.css';

// for patient
import PatientLogin from "./Pages/Patient/Login/PatientLogin";
import Signup from "./Pages/Patient/Signup/Signup";
import Dashboard from './Pages/Patient/Dashboard/Dashboard';
import Appointment from './Pages/Patient/Appointment/Appointment';
import DoctorInfo from './Pages/Patient/DoctorInfo/DoctorInfo';
import Schedule from './Pages/Patient/Schedule/Schedule';
import SettingInfo from './Pages/Patient/Setting/SettingInfo';
import MedicalHistory from './Pages/Patient/MedicalHistory/MedicalHistory';

// for doctor
import DoctorLogin from './Pages/Doctor/Login/DoctorLogin';
import DoctorAppointment from './Pages/Doctor/Appointment/DoctorAppointment';
import MedicalExam from './Pages/Doctor/Medical/MedicalExam';
import DetailExam from './Pages/Doctor/DetailExam/DetailExam';
import HistoryExam from './Pages/Doctor/HistoryExam/HistoryExam';
import ApproveAppointments from './Pages/Doctor/ApproveAppointments/ApproveAppointments';

import adminRouter from "./Pages/Admin/AdminRouter";

import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import DetailHistory from './Pages/Doctor/DetailHistory/DetailHistory';


const router = createBrowserRouter([
    {
        path: '/',
        element: <div><Dashboard /></div>
    },
    {
        path: '/login',
        element: <div><PatientLogin /></div>
    },
    {
        path: '/signup',
        element: <div><Signup /></div>
    },
    {
        path: '/appointment',
        element: <div><Appointment /></div>
    },
    {
        path: '/appointment/:id',
        element: <div><DoctorInfo /></div>
    },
    {
        path: '/schedule/:patientId',
        element: <Schedule />
    },
    {
        path: '/settingInfo',
        element: <SettingInfo />
    },
    {
        path: '/medicalhistory',
        element: <div><MedicalHistory /></div>
    },


    // for doctor
    {
        path: 'doctor/login',
        element: <DoctorLogin />
    },
    {
        path: 'doctor/appointment',
        element: <DoctorAppointment />
    },
    {
        path: 'doctor/medical',
        element: <MedicalExam />
    },
    {
        path: 'doctor/medical/:examId',
        element: <DetailExam />
    },
    {
        path: 'doctor/medical/history',
        element: <HistoryExam/>
    },
    {
        path: 'doctor/medical/history/:examId',
        element: <DetailHistory/>
    },
    {
        path: 'doctor/approve-appointments/:doctor_id',
        element: <ApproveAppointments />
    },

    // for admin
    ...adminRouter
    
])

function App() {
  return (
      <div>
          <RouterProvider router={router}/>
      </div>
  );
}

export default App;
