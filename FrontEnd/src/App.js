// import logo from './logo.svg';
import './App.css';
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>< Dashboard/></div>
    },
    {
        path: '/login',
        element: <div><Login /></div>
    },
    {
        path: '/signup',
        element: <div><Signup /></div>
    },
])

function App() {
  return (
      <div>
          <RouterProvider router={router}/>
      </div>
  );
}

export default App;
