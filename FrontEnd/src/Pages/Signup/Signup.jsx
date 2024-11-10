import React, { useState } from 'react';
import '../../App.css'
import { Link, useNavigate} from 'react-router-dom';
import Axios from 'axios'
import video from '../Assets/video.mp4'
import logo from '../Assets/logo.png'
import { FaUserShield } from 'react-icons/fa'
import { AiOutlineSwapRight } from 'react-icons/ai'
import { MdMarkEmailRead } from 'react-icons/md'



const Signup = () => {
    const [CCCD, setCCCD] = useState('')
    const [password, setPassword] = useState('')
    const [rewritePassword, setRewritePassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigateTo = useNavigate();

    const createUser = (e) => {
        e.preventDefault()
        if (password !== rewritePassword) {
            setErrorMessage('Password and rewrite password are not the same!')
            return

        }
        Axios.post('http://localhost:3005/users/signup', {
            CCCD: CCCD,
            Password: password,
        }).then(() => {
            navigateTo('/login');
            setCCCD('');
            setPassword('');
            setRewritePassword('');
            setErrorMessage('')
        }).catch((error) => {
            console.error('Error during signup request:', error);
        })

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

                    <form action="" className="form grid">

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

                        <button type='submit' className='btn flex' onClick={createUser}>
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