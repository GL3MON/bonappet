import { useEffect, useState } from 'react';
import '../styles/Cart.css'; // Create a new CSS file for cart styles
import NavBar from './NavBar';
import { color, motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const CartPage = () => {

    const navigate = useNavigate();
    const topVariants = {
        tap: {
            scale: 0.98,
            
        },
        hover: {
            scale: 1.02,
        }, 
    }

    const [cartItems, setCartItems] = useState([]);

    const handle_cart_changes = async(food_id, quantity) => {
        try {
            const user_mail = localStorage.getItem("user_mail");
            const response = await axios.post("http://127.0.0.1:8000/add-cart/", {"food_id": food_id, "quantity": quantity, "user_mail": user_mail});
            console.log(response);
            get_cart_items();
        }catch(e){
            console.log(e);
        }
    }

    const get_cart_items = async () => {
        try {
            const user_mail = localStorage.getItem("user_mail");
            console.log(user_mail);
            const items = await axios.post("http://127.0.0.1:8000/cartitems/", {"user_mail": user_mail});
            console.log(items.data);
            setCartItems(items.data.cart_items);
        }catch(e){
            console.log(e);
        }   
    }

    useEffect(() => {get_cart_items()}, []);

    


    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    const handleRemoveItem = async (id) => {
        setCartItems(cartItems.filter(item => item.food_id !== id));
        try {
            const user_mail = localStorage.getItem("user_mail");
            const response = await axios.post("http://127.0.0.1:8000/add-cart/", {"user_mail": user_mail, "food_id": id, "quantity":0});
            console.log(response);
        }catch(e) {
            console.log(e);
        }
    };

    return (
        <div className="cart-page">
            <div className='cart-title'>
                <h1>🛒 Your Cart</h1>
            </div>            
            {cartItems.length === 0 ? (
                <div className='empty'>
                    <h2 id='cart-empty'>Oops... Your cart is empty.</h2>
                    <motion.div variants={topVariants} whileHover={"hover"} whileTap={"tap"} className='empty-cart-button' onClick={()=>{navigate("/")}}>
                        <span>Checkout Restaurants</span>
                        </motion.div>
                </div>
            ) : (
                <div className="cart-items">
                    {cartItems.map(item => (
                        <motion.div variants={topVariants} whileTap={"tap"} whileHover={"hover"} key={item.food_id} className="cart-item">
                            <div className='food-image'>
                            </div>
                            <div className="item-details">
                                <h2 className="name">{item.name}</h2>
                                <p>Price: ${item.price.toFixed(2)}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <div className='buttons'>
                                <button className="remove" onClick={() => handleRemoveItem(item.food_id)}>Remove</button>
                                <motion.button className='add' variants={topVariants} whileTap={"tap"} whileHover={"hover"} onClick={()=>{handle_cart_changes(item.food_id, item.quantity+1)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M12 7v10M7 12h10" stroke="white" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                </motion.button>
                                <motion.button className='sub' variants={topVariants} whileTap={"tap"} whileHover={"hover"} onClick={()=>{handle_cart_changes(item.food_id, item.quantity-1)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M7 12h10" stroke="white" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                    <div className='checkout'>
                        <div className="total-amount">
                            <h2>Total: ${totalAmount}</h2>
                        </div>
                    </div>
                    <motion.button variants={topVariants} whileHover={"hover"} whileTap={"tap"} className="checkout-button">Proceed to Checkout</motion.button>
                </div>
            )}
        </div>
    );
}

export default CartPage;
