import React, { useEffect, useState } from 'react';
import "../styles/SwipeItem.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from "framer-motion";
import { isElement } from 'react-dom/test-utils';

const SwipeItem = ({ name, veg, food_id, rest_id }) => {

    const nagivate = useNavigate();
    const [isSelected, setIsSelected] = useState(false);
    const swipeItem = {
        hover: {
            scale: 1.1,
        },
        tap: {
            scale: 0.9,
        },
    };

    const imageSrc = true;

    const handleSelection = async (food_id) => {
        const user_mail = localStorage.getItem("user_mail");
        if (!isSelected) {
            try{
                const response = await axios.post("http://127.0.0.1:8000/add-cart/", {"user_mail": user_mail, "food_id": food_id, "quantity":1});
                console.log(response);
                setIsSelected(!isSelected);
            }catch(e){
                console.log(e);
            }
        }else {
            try{
                const response = await axios.post("http://127.0.0.1:8000/add-cart/", {"user_mail": user_mail, "food_id": food_id, "quantity":0});
                console.log(response);
                setIsSelected(!isSelected);
            }catch(e){
                console.log(e);
            }
        }
    }

    const veg_style = {
        backgroundColor: "green",
    };
    const normal_style = {
        backgroundColor: "rgb(176,0,0)",
    };

    return (
        <motion.div
            className="swipe-item"
            variants={swipeItem}
            whileHover="hover"
            whileTap="tap"
            onClick={()=>{handleSelection(food_id)}}
        >
            {isSelected && <div className='green-tick'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path 
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" 
                    fill="white"
                />
                </svg>
            </div>}
            {imageSrc ? (
                <img src={`/assets/rest_${rest_id}/food_${food_id}.jpg`} alt={name} />
            ) : (
                <p>Loading image...</p>
            )}

            <div className="swipe-item-title" style={veg ? veg_style : normal_style}>
                <span>{name}</span>
            </div>
        </motion.div>
    );
};

export default SwipeItem;