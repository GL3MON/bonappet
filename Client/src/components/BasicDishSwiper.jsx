import '../styles/BasicDishSwiper.css'
import SwipeItem from './SwipeItem'
import { motion } from 'framer-motion'

const BasicDishSwiper = ({title}) => {

    const dummyList = [1,2,3,4,5,5,6,7,8,8,9,9,10,10];



    return <div className="basic-dish-swipe">
        <div className="top-nav">
                <h1>{title}</h1>
        </div>
        <div className='swipe-items'>
           {
            dummyList.map((item, index) => (
                <SwipeItem key={index} name="Moneky" veg={true}/>
            ))
           }
        </div>
    </div>

}

export default BasicDishSwiper;