import { color, motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import BasicDishSwiper from './CartSwiper.jsx';
import '../styles/cart.css';
const Cart = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    
    return (      
        <div className="cartpage" ref={ref}>
            <div class ="header">CART</div>
            <div className="underline"></div>
            <BasicDishSwiper />
            <div class="cost">Total Cost:</div>
            <div class="submit">Check Out</div>
        </div>
    );
}

export default Cart;
