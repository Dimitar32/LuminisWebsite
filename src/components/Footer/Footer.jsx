import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import styles from './Footer.module.css';
import {
    // FaFacebookF,
    FaInstagram,
    FaTiktok
} from 'react-icons/fa';

const Footer = () => {
    const location = useLocation();
  
    const fixedFooterPages = ['/notavl', '/delivery'];
    const isFixedFooter = fixedFooterPages.includes(location.pathname);
    // const footerClass = fixedFooterPages.includes(location.pathname) ? 'fixed-footer' : '';
  
    return (
        <footer className={`${styles.footer} ${isFixedFooter ? styles.fixedFooter : ''}`}>
            <div className={styles.socialLinks}>
                {/* <a
                    target="_blank" rel="noopener noreferrer"
                    href="https://www.facebook.com/profile.php?id=61566904842905"
                    aria-label="Facebook"
                    >
                    <FaFacebookF />
                </a> */}

                <a
                    target="_blank" rel="noopener noreferrer"
                    href="https://www.instagram.com/the.luminis/"
                    aria-label="Instagram"
                    >
                    <FaInstagram />
                </a>

                <a
                    target="_blank" rel="noopener noreferrer"
                    href="https://www.tiktok.com/@theluminis"
                    aria-label="TikTok"
                    >
                    <FaTiktok />
                </a>
            </div>
            <p>Тел: +359 879 330 389</p>
            <p>Свържете се с нас: theluminis@outlook.com</p>
            <Link to="/delivery" className={styles.link}>Правила за доставка</Link>
            
            <p>&copy; {new Date().getFullYear()} Luminis. <Link to="/privacy" className={styles.linkPrivacy}>Всички права запазени</Link></p>
        </footer>
    );
};

export default Footer;
