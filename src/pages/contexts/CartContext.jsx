import React, { createContext, useState, useEffect } from 'react';

// Създаваме нов контекст за количката
export const CartContext = createContext();

// Провайдър компонент за количката
export const CartProvider = ({ children }) => {
    // const [cartItems, setCartItems] = useState([]);

    // useEffect(() => {
    //     const savedCart = localStorage.getItem('cartItems');
    //     // console.log('Loaded cart from localStorage:', savedCart);
    //     if (savedCart) {
    //         setCartItems(JSON.parse(savedCart));
    //     }
    // }, []);

    // useEffect(() => {
    //     console.log('Saving cart to localStorage:', cartItems);
    //     localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // }, [cartItems]);
    // Зареждаме данните от Local Storage само при първоначално стартиране
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Запазваме количката в Local Storage при всяка промяна
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity, option) => {
        setCartItems((prevItems) => {
            // Check if the product with the same ID and option already exists in the cart
            const itemExists = prevItems.find(item => item.id === product.id && item.option === option);
    
            if (itemExists) {
                // Update quantity if the same product with the same option exists
                return prevItems.map(item =>
                    item.id === product.id && item.option === option
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Add a new item if it doesn't already exist
                return [...prevItems, { ...product, quantity, option }];
            }
        });
    };

    // Функция за премахване на продукт от количката
    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter(item => item.id !== productId)
        );
    };

    // Функция за изчистване на количката
    const clearCart = () => {
        setCartItems([]); // Нулира количката
        localStorage.removeItem('cartItems'); // Изтрива от Local Storage
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
