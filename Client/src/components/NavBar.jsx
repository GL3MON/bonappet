import '../styles/NavBar.css'
import { motion, useTransform, useAnimate, transform } from 'framer-motion';

const NavBar = () => {

    const topVariants = {
        tap: {
            scale: 0.9,
            
        },
        hover: {
            scale: 1.1,
        },
    }

    return <div className='nav-bar'>
        <motion.div
            id="nav-item-initial"
            className='nav-bar-item'
            variants={topVariants}
            whileHover={"hover"}
            whileTap={"tap"}
        >
            <svg viewBox="0 0 32 32" height="19" width="19" fill="#686b78" >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"/></svg>
            </svg>
            <span>Back</span>
        </motion.div>
        
        <motion.div className='nav-location'
            variants={topVariants}
            whileHover={"hover"}
        >
            <motion.div className='location'>
                <div className='location-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 0C400 0 288 32 288 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 0-112 0-208c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7L80 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16l0 134.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8L64 16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"/></svg>
                </div>
                Pizza.. Burger.. Butter Chicken..
            </motion.div>
        </motion.div>

        <motion.div 
        className='nav-bar-item'
        variants={topVariants}
        whileHover={"hover"}
        whileTap={"tap"}
        >
            <span>Check Out </span>
            <svg viewBox="0 0 32 32" height="19" width="19" fill="#686b78">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
            </svg>
        </motion.div>

    </div>
}

export default NavBar;