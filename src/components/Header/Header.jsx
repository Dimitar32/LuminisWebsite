import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; 
import logo from '../Header/The_Luminis_New_Logo-removebg-preview.png';
// import logo from '../Header/The Luminis New Logo.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.hamburger} onClick={toggleMenu}>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
            </div>
            <Link to="/" className={styles.logo}>
                <img src={logo} alt="Luminis Logo" className={styles.logoImage} />
            </Link>
            <nav className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
                <Link to="/" onClick={toggleMenu}>Начало</Link>
                <Link to="/products" onClick={toggleMenu}>Продукти</Link>
                <Link to="/faq" onClick={toggleMenu}>Често задавани въпроси</Link>
            </nav>
        </header>
    );
};

export default Header;
