import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 
import logo from '../Header/Luminis_logo-removebg-preview.png';

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="logo">
                <img src={logo} alt="Luminis Logo" className="logo-image" />
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
