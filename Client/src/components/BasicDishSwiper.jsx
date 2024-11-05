import '../styles/BasicDishSwiper.css'
import SwipeItem from './SwipeItem'
import RestSwipeItem from './RestSwipeItem'
import { motion } from 'framer-motion'

const BasicDishSwiper = ({title, content, type}) => {

    return <div className="basic-dish-swipe">
        <div className="top-nav">
                <h1>{title}</h1>
        </div>
        <div className='swipe-items'>
           { type === "food" ?
            content.map((item, index) => (
                <SwipeItem key={index} name={item.name} veg={item.type} food_id={item.food_id} rest_id={item.restaurant_id}/>
            )) : 
            content.map((item, index) => (
                <RestSwipeItem key={index} name={item.name} veg={item.type} rest_id={item.restaurant_id}/>
            ))
           }
        </div>
    </div>

}

export default BasicDishSwiper;