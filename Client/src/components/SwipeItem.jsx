import "../styles/SwipeItem.css"
import { motion } from "framer-motion";

const SwipeItem = ({name, veg}) => {

    const swipeItem = {
        hover: {
            scale: 1.1,
        },
        tap: {
            scale: 0.9,
        },
    }
    const veg_style = {
        backgroundColor: "green",
    }
    const normal_style = {
        backgroundColor: "rgb(176,0,0)",
    }

    return <motion.div
            className="swipe-item"
            variants={swipeItem}
            whileHover={"hover"}
            whileTap={"tap"}
            >
            <div className="swipe-item-title" style={veg ? veg_style : normal_style}>
                <span>{name}</span>
            </div>
     </motion.div>

}

export default SwipeItem;