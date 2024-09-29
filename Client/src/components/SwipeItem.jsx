import "../styles/SwipeItem.css"
import { motion } from "framer-motion";

const SwipeItem = () => {

    const swipeItem = {
        hover: {
            scale: 1.1,
        },
        tap: {
            scale: 0.9,
        },
    }

    return <motion.div
            className="swipe-item"
            variants={swipeItem}
            whileHover={"hover"}
            whileTap={"tap"}
            >
     </motion.div>

}

export default SwipeItem;