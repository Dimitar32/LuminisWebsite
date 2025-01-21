import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; 
import logo from '../Header/Luminis_logo-removebg-preview.png';

const Header = () => {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                <img src={logo} alt="Luminis Logo" className={styles.logoImage} />
            </Link>
            <nav>
                <Link to="/">Начало</Link>
                <Link to="/products">Продукти</Link>
                <Link to="/faq">Често задавани въпроси</Link>
            </nav>
        </header>
    );
};

export default Header;
