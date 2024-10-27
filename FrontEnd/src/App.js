// import logo from './logo.svg';
import './App.css';
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <div><Login /></div>
    },
    {
        path: '/login',
        element: <div><Login /></div>
    },
    {
        path: '/signup',
        element: <div><Signup /></div>
    },
    // {
    //     path: '/dashboard',
    //     element: <div><Dashboard /></div>
    // }
])

function App() {
  return (
      <div>
          <RouterProvider router={router}/>
      </div>
  );
}

export default App;
