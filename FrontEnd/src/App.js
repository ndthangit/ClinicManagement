// import logo from './logo.svg';
import './App.css';
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
import Medical from './Pages/Doctor/Medical/Medical';

import adminRouter from "./Pages/Admin/AdminRouter";



import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

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
        element: <Medical />
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
