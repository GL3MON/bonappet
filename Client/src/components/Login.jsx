// import
import '../styles/Login.css';
import axios from 'axios';
import login_image from '/assets/login.jpg';
import React, { useState, useEffect } from 'react';
import { color, motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const nagivate = useNavigate();
    const [loginFailed, setLoginFailed] = useState(false);
    const handle_login = async () => {
        const mail = document.getElementById("login-mail").value;
        const password = document.getElementById("login-password").value;
        try {
            const user_details = await axios.post('http://127.0.0.1:8000/login/', {
                "user_mail":mail,
                "password": password,
            });
            console.log(user_details.data);
            if (user_details.data.response === "Login successful"){
                localStorage.setItem('user_name', user_details.data.user_name);
                localStorage.setItem('user_mail', user_details.data.user_mail);
                localStorage.setItem('phone_number', user_details.data.phone_number);
                localStorage.setItem('address', user_details.data.address);
                nagivate("/")
            }else{
                setLoginFailed(true);
                console.log(loginFailed);
            }
        } catch (error) {
            setLoginFailed(true);
            console.log(loginFailed);
            console.error(error);
        }
    }

    const topVariants = {
        tap: {
            scale: 0.9,
            
        },
        hover: {
            scale: 1.1,
        }, 
    }

    return <div className='login-container'>
            <div className='bonappet-title'>
                <span>Bon Appet</span>
            </div>
            <div className='login-image'>
                <img src={login_image} />
                <div className='login-text-overlay'>
                    <span className='food-title'>Chicken Wings</span><br/>
                    <span className='food-description' style={{fontWeight:"700"}}>Best Seller in 2023</span><br/>
                    <span className='food-description'>Indulge in our best-selling Spicy Garlic Chicken Wings, marinated to perfection with zesty garlic and a kick of chili.</span>
                </div>
            </div>
            <div className='login-box'>
                <div className='login-title'>
                    <span>Login</span>
                </div>
                {loginFailed && <div className='login-failed'>
                                <span>Login Failed</span>
                                </div>}
                <div className='login-items'>
                    <div className='login-row'>
                        <svg className = "login-icon" viewBox="0 0 512 512" height="19" width="19" fill="#686b78">
                            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                        </svg>
                        <input type='text' placeholder='Mail'id='login-mail'/>
                    </div>
                    <div className='login-row'>
                        <svg className = "login-icon" viewBox="0 0 448 512" height="19" width="19" fill="#686b78">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/></svg>
                        </svg>
                        <input type='password' placeholder='Password' id='login-password'/>
                    </div>
                </div>
                <motion.div 
                className='login-button'
                variants={topVariants}
                whileHover={"hover"}
                whileTap={"tap"}
                onClick={handle_login}
                >
                    <span>Login</span>
                </motion.div>
            </div>
        </div>
}

export default Login;
