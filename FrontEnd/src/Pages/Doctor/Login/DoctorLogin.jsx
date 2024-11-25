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
import { loginDoctorFailed, loginDoctorStarted, loginDoctorSuccess } from '../../Features/DoctorSlice';
import {fetchDoctors} from "../../Features/DoctorSlice";
import {fetchMedicines} from "../../Features/AdminSlice";

const DoctorLogin = () => {
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
        dispatch(loginDoctorStarted());
        Axios.post('http://localhost:3005/doctor/login', accountInfo).then((res)=>{
            console.log("rss from backend",res.data.message);
            if( res.data.message === 'connection success'){
                console.log(res.data);
                dispatch(loginDoctorSuccess(res.data));
                navigateTo('/doctor/appointment');
            }
            else {
                dispatch(loginDoctorFailed());
                console.log("res from backend",res.data);
            }
        }).catch((error) => {
            console.error('Error during login request:', error);
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
                        <span className="text">Admin?</span>
                        <Link to={'/signup'}>
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

                        <button type='submit' className='btn flex' onClick={(event) => {loginUser(event)}}>
                            <span>Login</span>
                            <AiOutlineSwapRight className="icon"/>
                        </button>

                        <span className="forgotPassword">
                            Forgot your password? <Link to="/login">Click Here</Link>
                        </span>
                        <span className="forgotPassword">
                            Are you not a doctor? <Link to="/login">Click Here</Link>
                        </span>
                            
                    </form>
                </div>

            </div>
        </div>
    )
}

export default DoctorLogin