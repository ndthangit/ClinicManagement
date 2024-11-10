// import logo from './logo.svg';
import './App.css';
import PatientLogin from "./Pages/Login/PatientLogin";
import Signup from "./Pages/Signup/Signup";
import Dashboard from './Pages/Dashboard/Dashboard';
import Appointment from './Pages/Appointment/Appointment';
import DoctorInfo from './Pages/DoctorInfo/DoctorInfo';
import Schedule from './Pages/Schedule/Schedule';

// for doctor
import DoctorLogin from './Pages/Doctor/Login/DoctorLogin';
import DoctorAppointment from './Pages/Doctor/Appointment/DoctorAppointment';
import Medical from './Pages/Doctor/Medical/Medical';

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
    }
    
])

function App() {
  return (
      <div>
          <RouterProvider router={router}/>
      </div>
  );
}

export default App;
