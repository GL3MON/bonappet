import { useState } from 'react';
import '../styles/cart.css'; // Create a new CSS file for cart styles
import NavBar from './NavBar';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([
        // Sample cart items, you can replace this with data from your state management
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
            <NavBar />
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="item-details">
                                <h2 className="name">{item.name}</h2>
                                <p>Price: ${item.price.toFixed(2)}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <button className="remove" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                        </div>
                    ))}
                </div>
            )}
            <div className="total-amount">
                <h2>Total: ${totalAmount}</h2>
            </div>
            <button className="checkout-button">Proceed to Checkout</button>
        </div>
    );
}

export default CartPage;
