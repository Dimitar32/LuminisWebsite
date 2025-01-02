import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false); // Състояние за отваряне/затваряне на количката

    const handleCartToggle = () => {
        setIsOpen(!isOpen); // Превключване между отворена и затворена количка
    };

    const navigate = useNavigate();
    
    const handleCheckout = () => {
        setIsOpen(false);
        navigate('/order');
    };

    return (
        <>
            <button className="cart-toggle-button" onClick={handleCartToggle}>
                <i className="fas fa-shopping-cart"></i> {/* Икона за количка */}
                <span className="cart-count">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span> 
            </button>

            <div className={`cart-sidebar ${isOpen ? 'open' : 'closed'}`}>
                <div className="cart-header">
                    <h2>Вашата количка</h2>
                    <button className="close-cart" onClick={handleCartToggle}>
                        {isOpen ? 'x' : '←'}
                    </button>
                </div>
                <div className="cart-content">
                    {cartItems.length === 0 ? (
                        <p>Количката е празна.</p>
                    ) : (
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id}>
                                    {item.name} - {item.quantity} бр. <br /> {(parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity).toFixed(2)} лв.
                                    <button className='remove-item-from-cart' onClick={() => removeFromCart(item.id)}>Премахни</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {cartItems.length > 0 && (
                    <button className="checkout-button" onClick={handleCheckout}>Поръчай</button>
                )}
            </div>

            {isOpen && <div className="overlay" onClick={handleCartToggle}></div>}
        </>
    );
};

export default Cart;
