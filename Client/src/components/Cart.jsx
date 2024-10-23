import { useState } from 'react';
import '../styles/Cart.css'; // Create a new CSS file for cart styles
import NavBar from './NavBar';
import { color, motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


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

    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Spaghetti', price: 12.99, quantity: 1 },
        { id: 2, name: 'Caesar Salad', price: 8.99, quantity: 2 },
        { id: 3, name: 'Cheeseburger', price: 10.49, quantity: 1 },
    ]);

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
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
                        <motion.div variants={topVariants} whileTap={"tap"} whileHover={"hover"} key={item.id} className="cart-item">
                            <div className="item-details">
                                <h2 className="name">{item.name}</h2>
                                <p>Price: ${item.price.toFixed(2)}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <button className="remove" onClick={() => handleRemoveItem(item.id)}>Remove</button>
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
