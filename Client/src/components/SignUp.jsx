
import '../styles/Signup.css'
import login_image from '/assets/login.jpg';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { color, motion, useScroll, useTransform } from 'framer-motion';

const Signup = () => {
    const nagivate = useNavigate();
    const handle_register = async () => {
        const mail = document.getElementById("user-mail").value;
        const password = document.getElementById("user-password").value;
        const username = document.getElementById("user-name").value;
        const phoneno = document.getElementById("user-phno").value;
        const address = document.getElementById("user-address").value;

        try {
            const response = await axios.post('http://127.0.0.1:8000/register/', {
                "user_mail":mail,
                "password": password,
                "user_name": username, 
                "phone": phoneno,
                "address": address,
            });
            console.log(response.data);
            if (response.data.response === "Registration Success"){
                nagivate("/login/")
            }
        } catch (error) {
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

    return <div className='register-container'>
        <div className='bonappet-title'>
                <span>Bon Appet</span>
        </div>
        <div className='register-image'>
            <img src={login_image} />
            <div className='register-text-overlay'>
                <span className='food-title'>Chicken Wings</span><br/>
                <span className='food-description' style={{fontWeight:"700"}}>Best Seller in 2023</span><br/>
                <span className='food-description'>Indulge in our best-selling Spicy Garlic Chicken Wings, marinated to perfection with zesty garlic and a kick of chili.</span>
            </div>
        </div>
        <div className='register-box'>
            <div className='register-row'>
                <svg className='register-icon' viewBox="0 0 448 512" height="19" width="19" fill="#686b78">
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                </svg>
                <input type='text' placeholder='User Name' id='user-name'/>
            </div>
            <div className='register-row'>
                <svg className = "register-icon" viewBox="0 0 512 512" height="19" width="19" fill="#686b78">
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
                <input type='text' placeholder='Mail'id='user-mail'/>
            </div>
            <div className='register-row'>
                <svg className = "register-icon" viewBox="0 0 448 512" height="19" width="19" fill="#686b78">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                </svg>
                <input type='text' placeholder='Phone Number' id='user-phno'/>
            </div>
            <div className='register-row'>
                 <svg className = "register-icon" viewBox="0 0 448 512" height="19" width="19" fill="#686b78">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/></svg>
                </svg>
                <input type='password' placeholder='Password' id='user-password'/>
            </div>
            <div className='register-row'>
                <svg className = "register-icon" viewBox="0 0 448 512" height="19" width="19" fill="#686b78">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M96 0C60.7 0 32 28.7 32 64l0 384c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L96 0zM208 288l64 0c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zM496 192c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64z"/></svg>
                </svg>
                <input type='text' placeholder='Address' id='user-address'/>
            </div>
            <motion.div 
            className='register-button'
            variants={topVariants}
            whileHover={"hover"}
            whileTap={"tap"}
            onClick={handle_register}
            >
                <span>Register</span>
            </motion.div>
        </div>
    </div>
}
export default Signup ;

