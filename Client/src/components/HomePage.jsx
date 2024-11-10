import { color, motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState} from 'react';
import homepageimg from '/assets/homepagetitle.jpg';
import axios from 'axios';
import '../styles/HomePage.css';
import NavBar from './NavBar';
import BasicDishSwiper from './BasicDishSwiper';

const HomePage = () => {
    const ref = useRef(null);
    const [topFoods, setTopFoods] = useState([]);
    const [topRestaurants, setTopRestaurants] = useState([]);
    const [trendingFoods, setTrendingFoods] = useState([]);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    
    const highest_rated_food = async () => {
        try {
            const top_foods = await axios.post('http://127.0.0.1:8000/top_foods/', {});
            setTopFoods(top_foods.data);
            console.log(top_foods.data);
        } catch (error) {
            console.error(error);
        }
    }

    const trending_food = async () => {
        try {
            const trending_foods = await axios.post('http://127.0.0.1:8000/trending_foods/', {});
            setTrendingFoods(trending_foods.data)
            console.log(trending_foods.data);
        } catch (error) {
            console.error(error);
        }
    }



    const top_restaurants = async () => {
        try {
            const top_restaurants = await axios.get('http://127.0.0.1:8000/top_restaurants/', {});
            setTopRestaurants(top_restaurants.data);
            console.log(top_restaurants.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {highest_rated_food()}, []);
    useEffect(() => {top_restaurants()}, []);
    useEffect(() => {trending_food()}, []);

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
                            letterSpacing: letterSpacing,
                        }}
                        
                    >
                        Bon <span style={{color:"rgb(176, 0, 0)"}} >Appet</span>
                </motion.h1>
                <div className='overlay' />
            </div>
            <NavBar />
            <BasicDishSwiper title={"Highest Rated Food"} content={topFoods} type={"food"}/>
            <BasicDishSwiper title={"Trending Food"} content={trendingFoods} type={"food"}/>
            <BasicDishSwiper title={"Top Restaurants"} content={topRestaurants} type={"restaurant"}/>
        </div>
    );
}

export default HomePage;
