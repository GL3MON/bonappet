import { color, motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState} from 'react';
import { useParams } from "react-router-dom";
import '../styles/HomePage.css';
import NavBar from './RestNav';
import BasicDishSwiper from './BasicDishSwiper';
import axios from 'axios';


const RestPage = () => {
    const ref = useRef(null);
    const { slug } = useParams();
    const [foods, setFoods] = useState([]);
    const [topRatedFood, setTopRatedFood] = useState([]);

    const get_fooditems = async () => {
        try {
            const foods = await axios.post('http://127.0.0.1:8000/fooditems/', {"restaurant_id":slug});
            setFoods(foods.data);
            console.log(foods.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {get_fooditems()}, []);
    
    setTopRatedFood(foods.filter(food => food.rating > 4).sort);

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
                        backgroundImage: `url('/assets/rest_${slug}/rest_${slug}.jpg')`, 
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
                            letterSpacing: letterSpacing,
                        }}
                        
                    >
                        Bon <span style={{color:"rgb(176, 0, 0)"}} >Appet</span>
                </motion.h1>
                <div className='overlay' />
            </div>
            <NavBar content={"hi"}/>
            {/* <BasicDishSwiper title="Top Rated" type={"food"}/>
            <BasicDishSwiper title="Healthy" type={"food"}/> */}
        </div>
    );
}

export default RestPage;
