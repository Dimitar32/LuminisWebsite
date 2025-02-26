import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';

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
            <button className={styles.cartToggleButton} onClick={handleCartToggle}>
                <i className="fas fa-shopping-cart"></i> {/* Икона за количка */}
                <span className="cart-count">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span> 
            </button>

            <div className={`${styles.cartSidebar} ${isOpen ? styles.cartSidebarOpen : styles.cartSidebarClosed}`}>
                <div className={styles.cartHeader}>
                    <h3>Вашата количка</h3>
                    <button className={styles.closeCart} onClick={handleCartToggle}>
                        {isOpen ? 'x' : '←'}
                    </button>
                </div>
                <div className={styles.cartContent}>
                    {cartItems.length === 0 ? (
                        <p>Количката е празна.</p>
                    ) : (
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id}>
                                    {item.productname} - {item.quantity} бр. <br /> {(parseFloat(item.discount_price.replace(/[^\d.-]/g, '')) * item.quantity).toFixed(2)} лв.
                                    <button className={styles.removeItemFromCart} onClick={() => removeFromCart(item.id)}>Премахни</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {cartItems.length > 0 && (
                    <button className={styles.checkoutButton} onClick={handleCheckout}>Поръчай</button>
                )}
            </div>

            {isOpen && <div className={styles.overlay} onClick={handleCartToggle}></div>}
        </>
    );
};

export default Cart;
