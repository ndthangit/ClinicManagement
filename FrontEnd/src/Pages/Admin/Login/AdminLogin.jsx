import React, {useEffect, useState} from 'react';
import '../../../App.css'
import {Link, useNavigate} from 'react-router-dom';
import Axios from 'axios'
import video from '../../Assets/video.mp4'
import logo from '../../Assets/pngtree-hospital-icon-design-illustration-png-image_5339806.jpg'
import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiOutlineSwapRight} from 'react-icons/ai'
import {useDispatch} from "react-redux";
import {loginAdminFailed, loginAdminSuccess} from "../../Features/AdminSlice";
import {fetchPayments} from "../../Features/PaymentSclice";
import {fetchAppointments} from "../../Features/AppointmentSlice";
import {fetchDoctorInfo} from "../../Features/DoctorInforSlice";
import {fetchPatientInfo} from "../../Features/PatientInforSlice";


const AdminLogin = () => {
    const state = {content: null}
    const [username, setUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigateTo = useNavigate();
    const [loginStatus, setLoginStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');

    const dispatch = useDispatch();

    const loginUser = (e) => {
        e.preventDefault();

        const accountInfo ={
            user_name: username,
            password: loginPassword
        };
        Axios.post('http://localhost:3005/admin/login', accountInfo).then((res)=>{
            console.log("rss from backend",res.data.message);
            if( res.data.message === 'connection success'){
                dispatch(loginAdminSuccess(res.data.user_name))
                dispatch(fetchPayments())
                dispatch(fetchAppointments())
                dispatch(fetchDoctorInfo())
                dispatch(fetchPatientInfo())
                navigateTo('/admin');
            }
            else {
                dispatch(loginAdminFailed())
                console.log("res from backend",res.data);
            }
        }).catch((error) => {
            console.error('Error during login request:', error);
            setLoginStatus('*Incorrect username or password!');

        })
    };

    useEffect(() => {
        if (loginStatus !== '') {
            setStatusHolder('showMessage');
            setTimeout(() => {
                setStatusHolder('message');
            }, 2000);
        }
    }, [loginStatus]);

    const onSubmit = () => {
        setUsername('')
        setLoginPassword('')
    }

    return (
        <div className="loginPage flex">
            <div className="container flex">

                <div className="videoDiv">
                    <video src={video} autoPlay muted loop></video>

                    {/* <div className="textDiv">
                       <h2 className="title"></h2>
                       <p>Adopt the peace of nature!</p>
                    </div> */}

                    <div className="footerDiv flex">
                        <span className="text">Doctor?</span>
                        <Link to={'/doctor/login'}>
                            <button className="btn">Login</button>
                        </Link>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image"/>
                        <h3>Welcome Back!</h3>
                    </div>

                    <form action="" className="form grid" onSubmit={() => {onSubmit()}}>
                        <span className={statusHolder}>{loginStatus}</span>

                        <div className="inputDiv">
                            <label htmlFor="Username">Username</label>
                            <div className="input flex">
                                <FaUserShield className="icon"/>
                                <input type="text" id='username' placeholder='Enter Username'
                                       onChange={(event) => setUsername(event.target.value)}/>
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className="icon"/>
                                <input type="password" id='password' placeholder='Enter Password'
                                       onChange={(event) => setLoginPassword(event.target.value)}/>
                            </div>
                        </div>

                        {loginStatus && (
                            <span
                                style={{
                                    color: 'red',
                                    fontFamily: "'Roboto', sans-serif", 
                                    fontWeight: '600', 
                                    fontSize: '14px',
                                    padding: '5px',              
                                    display: 'inline-block',     
                                    textAlign: 'center',         
                                    maxWidth: '100%',            
                                }}
                            >
                                {loginStatus}
                            </span>
                        )}

                        <button type='submit' className='btn flex' onClick={(event) => {loginUser(event)}}>
                            <span>Login</span>
                            <AiOutlineSwapRight className="icon"/>
                        </button>

                        <span className="forgotPassword">
                            Are you not a doctor? <Link to="/login">Click Here</Link>
                        </span>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default AdminLogin