import { color, motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import homepageimg from '../assets/homepagetitle.jpg';
import '../styles/HomePage.css';
import NavBar from './NavBar';
import BasicDishSwiper from './BasicDishSwiper';

const HomePage = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const letterSpacing = useTransform(scrollYProgress, [0,1], ["15px", "100px"]);



    return (
        <div className="homepage" ref={ref}>
            <div className="title-bar">
                <motion.div 
                    className="title-bar-img"
                    style={{
                        backgroundImage: `url(${homepageimg})`, 
                        backgroundPositionY: backgroundY,
                    }}
                >
                </motion.div>
                <motion.h1 
                        className="title-font" 
                        style={{
                            y: textY,
                            position: "absolute",
                            top: "125px",
                            left: "540px",
                            letterSpacing: letterSpacing,
                        }}
                        
                    >
                        Bon <span style={{color:"rgb(176, 0, 0)"}} >Appet</span>
                </motion.h1>
                <div className='overlay' />
            </div>
            <NavBar />
            <BasicDishSwiper />
            <BasicDishSwiper />
            <BasicDishSwiper />
        </div>
    );
}

export default HomePage;
