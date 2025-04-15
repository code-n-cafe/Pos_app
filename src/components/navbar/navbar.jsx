import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/navbar/C&CLOGO.png";
import menuButton from "../../assets/navbar/menu.webp";
import cancelBtn from "../../assets/navbar/cancel.png";
import styles from './navbar.module.css';

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout(); // Use the logout function from context
        // Optional: redirect to home after logout
        window.location.href = "/";
    };

    return ( 
        <nav className={styles.navbar}>
            <div className={styles.navdiv}>
                <img src={logo} alt="COC logo" className={styles.logo}/> 
                <img 
                    src={menuOpen ? cancelBtn : menuButton}
                    alt="menu-button" 
                    className={styles.menuBtn}
                    onClick={() => setMenuOpen(!menuOpen)}
                />
            </div>
            <a className={styles.title} href="/">CODES AND COFFEE CAFE</a>
            <div className={styles.menu}>
                <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}>
                    <li><a href="/bookings">Book Now!</a></li>
                    <li><a href="/menu">Our Menus</a></li>
                    <li><a href="/giftcard">Gift Cards</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li>
                        {isAuthenticated ? (
                            <>
                                <a href="/profile">Profile</a>
                                <button onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <a href="/login">Member Login</a>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;