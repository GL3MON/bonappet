import React, { useEffect, useState } from 'react';
import "../styles/SwipeItem.css";
import { motion } from "framer-motion";

const SwipeItem = ({ name, veg, food_id, rest_id }) => {

    const swipeItem = {
        hover: {
            scale: 1.1,
        },
        tap: {
            scale: 0.9,
        },
    };

    const imageSrc = true;

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
        >
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
