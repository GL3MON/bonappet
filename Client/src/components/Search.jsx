import '../styles/Search.css';
import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';

const Searcb = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const controls = useAnimation();

    const handleFocus = () => {
        setIsFocused(true);
        controls.start({
            y: "-32vh",
            transition: { duration: 0.5, ease: "easeInOut" }
        });
    };

    const handleBlur = () => {
        const seach_bar = document.getElementById("search-bar");
        
        if (seach_bar.value === "") {
            setIsFocused(false);
            controls.start({
                y: 0,
                transition: { duration: 0.5, ease: "easeInOut" }
            });
        }
    };
    const handle_search = async () => {
        setSearchResults([]);
        const search_bar = document.getElementById("search-bar");
        const query = search_bar.value.trim();
        
        if (query === "") {
            return;
        }

        const similar_foods = await axios.post('http://127.0.0.1:8000/search/', { "query": query });
        setSearchResults(similar_foods.data);
        console.log(similar_foods.data);
    }

    return (
        <div className="search-container">
            <motion.div
                className="search-bar"
                animate={controls}
            >
                <span>Search For Your Favourite Meal</span>
                <textarea
                    id="search-bar"
                    placeholder="Describe your food..."
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handle_search}
                />
            </motion.div>
            <motion.div className='food-items'>
                {
                    searchResults.map((item, index) => (
                        <motion.div
                            key={index}
                            className='search-food-item'
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <img 
                                src={`/assets/rest_${item.restaurant_id}/food_${item.food_id}.jpg`}
                                alt={item.name} 
                            />
                            <div className='search-food-item-title'>
                                <span>{item.name}</span>
                                <span id="rating">{item.rating}</span>
                            </div>
                        </motion.div>
                    ))
                }
            </motion.div>
        </div>
    );
}

export default Searcb;
