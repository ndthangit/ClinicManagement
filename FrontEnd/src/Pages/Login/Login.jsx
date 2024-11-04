import React, {useEffect, useState} from 'react';
import '../../App.css'
import {Link, useNavigate} from 'react-router-dom';
import Axios from 'axios'
import video from '../Assets/video.mp4'
import logo from '../Assets/pngtree-hospital-icon-design-illustration-png-image_5339806.jpg'
import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiOutlineSwapRight} from 'react-icons/ai'
import {useDispatch} from "react-redux";
import {loginFailed, loginStarted, loginSuccess} from "../Features/UserSlice";

const Login = () => {
    const state = {content: null}
    const [accountID, setAccountID] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigateTo = useNavigate();
    const [loginStatus, setLoginStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');

    const dispatch = useDispatch();

    const loginUser = (e) => {
        e.preventDefault();

        const accountInfo ={
            account_id: accountID,
            password: loginPassword
        }
        dispatch(loginStarted());
        Axios.post('http://localhost:3005/users/login', accountInfo).then((res)=>{
            // console.log("rss from backend",res.data.message);
            if( res.data.message === 'connection success'){
                dispatch(loginSuccess(res.data.account_id));
                navigateTo('/');
            }
            else {
                dispatch(loginFailed());
                console.log("res from backend",res.data);
            }
        }).catch((error) => {
            console.error('Error during login request:', error);
        })
        // Axios.get(`http://localhost:3005/users/account/${accountID}`).then((res) => {
        //     console.log("res",res.data.message);
        // });
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
        setAccountID('')
        setLoginPassword('')
    }

    return (
        <div className="loginPage flex">
            <div className="container flex">

                <div className="videoDiv">
                    <video src={video} autoPlay muted loop></video>

                    {/*<div className="textDiv">*/}
                    {/*    <h2 className="title"></h2>*/}
                    {/*    <p>Adopt the peace of nature!</p>*/}
                    {/*</div>*/}

                    <div className="footerDiv flex">
                        <span className="text">Don't have an account?</span>
                        <Link to={'/signup'}>
                            <button className="btn">Sign Up</button>
                        </Link>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image"/>
                        <h3>Welcome Back!</h3>
                    </div>

                    <form action="" className="form grid" onSubmit={onSubmit}>
                        <span className={statusHolder}>{loginStatus}</span>

                        <div className="inputDiv">
                            <label htmlFor="CCCD">CCCD</label>
                            <div className="input flex">
                                <FaUserShield className="icon"/>
                                <input type="text" id='username' placeholder='Enter CCCD'
                                       onChange={(event) => setAccountID(event.target.value)}/>
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

                        <button type='submit' className='btn flex' onClick={loginUser}>
                            <span>Login</span>
                            <AiOutlineSwapRight className="icon"/>
                        </button>

                        <span className="forgotPassword">
                            Forgot your password? <a href="">Click Here</a>
                        </span>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login