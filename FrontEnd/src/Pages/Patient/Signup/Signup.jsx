import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Axios from 'axios'
import video from '../../Assets/video.mp4'
import logo from '../../Assets/logo.png'
import { FaUserShield } from 'react-icons/fa'
import { AiOutlineSwapRight } from 'react-icons/ai'
import { MdMarkEmailRead } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { loginStarted, loginSuccess, loginFailed } from '../../Features/UserSlice';



const Signup = () => {
    const [CCCD, setCCCD] = useState('')
    const [password, setPassword] = useState('')
    const [rewritePassword, setRewritePassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigateTo = useNavigate();
    const dispatch = useDispatch();


    const createUser = (e) => {
        e.preventDefault();
        if (password !== rewritePassword) {
            setErrorMessage('*Passwords do not match!');
            return;
        }

        // Đầu tiên tạo tài khoản người dùng
        Axios.post('http://localhost:3005/users/signup', {
            CCCD: CCCD,
            Password: password,
        })
        .then((res) => {
            const accountInfo = {
                user_name: CCCD,
                password: password,
            };
            dispatch(loginStarted());
            Axios.post('http://localhost:3005/users/login', accountInfo)
                .then((res) => {
                    if (res.data.message === 'connection success') {
                        dispatch(loginSuccess(res.data));
                        navigateTo('/settingInfo'); 
                    } else {
                        dispatch(loginFailed());
                        console.error('Đăng nhập thất bại', res.data);
                    }
                })
                .catch((error) => {
                    dispatch(loginFailed());
                    console.error('Lỗi khi đăng nhập:', error);
                });

                // Xóa dữ liệu trong form
                setCCCD('');
                setPassword('');
                setRewritePassword('');
                setErrorMessage('');
            }
        )
        .catch((error) => {
            console.error('Lỗi khi tạo tài khoản:', error);
            setErrorMessage('*Username already exists.');

        });
    };
    const onSubmit = () => {
        setCCCD('')
        setPassword('')
        setRewritePassword('')
    }

    return (
        <div className="signupPage flex">
            <div className="container flex">

                <div className="videoDiv">
                    <video src={video} autoPlay muted loop></video>

                    {/*<div className="textDiv">*/}
                    {/*    <h2 className="title">Create And Sell Extraordinary Products</h2>*/}
                    {/*    <p>Adopt the peace of nature!</p>*/}
                    {/*</div>*/}

                    <div className="footerDiv flex">
                        <span className="text">Have an account?</span>
                        <Link to={'/login'}>
                            <button className="btn">Login</button>
                        </Link>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image" />
                        <h3>Let Us Know You!</h3>
                    </div>

                    <form action="" className="form grid" onSubmit={() => {onSubmit()}}>
                        
                        <div className="inputDiv">
                            <label htmlFor="CCCD">CCCD</label>
                            <div className="input flex">
                                <MdMarkEmailRead className="icon" />
                                <input type="CCCD" id='CCCD' placeholder='Enter CCCD'
                                       onChange={(event) => setCCCD(event.target.value)} />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input type="password" id='password' placeholder='Enter Password'
                                       onChange={(event) => setPassword(event.target.value)} />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="rewrite_password">Rewrite password</label>
                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input type="password" id='rewrite_password' placeholder='Rewrite password'
                                       onChange={(event) => setRewritePassword(event.target.value)} />
                            </div>
                        </div>

                        {errorMessage && (
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
                            {errorMessage}
                        </span>
                    )}

                        <button type='submit' className='btn flex' onClick={(event) => {createUser(event)}}>
                            <span>Signup</span>
                            <AiOutlineSwapRight className="icon" />
                        </button>

                        {/*<span className="forgotPassword">*/}
                        {/*    Forgot your password? <a href="">Click Here</a>*/}
                        {/*</span>*/}

                    </form>
                </div>

            </div>
        </div>
    )
}

export default Signup;