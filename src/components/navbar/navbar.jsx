import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/navbar/C&CLOGO.png";
import styles from './navbar.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

export const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout(); // Use the logout function from context
        // Optional: redirect to home after logout
        window.location.href = "/";
    };

    return ( 
        <nav className={styles.navbar}>
            <div className={styles.inner}>
                <a className={styles.brand} onClick={() => navigate("/")}>
                <img src={logo} alt="COC logo" className={styles.logo}/> 
                <span>CODES AND COFFEE CAFE</span>
                </a>
            
                <button
                    className={styles.menuBtn}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-expanded={menuOpen}
                    aria-controls="primary-navigation"
                    type="button"
                    >
                    <FontAwesomeIcon 
                        icon={menuOpen ? faCircleXmark : faBars} 
                    />
                </button>

                <div className={styles.menu}>
                    <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}>
                        <li><a onClick={() => navigate("/bookings")}>Book Now!</a></li>
                        <li><a onClick={() => navigate("/menu")}>Our Menus</a></li>
                        <li><a onClick={() => navigate("/giftcard")}>Gift Cards</a></li>
                        <li><a onClick={() => navigate("/contact")}>Contact Us</a></li>

                        {isAuthenticated ? (
                            <>
                                <a onClick={() => navigate("/profile")}>Profile</a>
                                <button onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <a onClick={() => navigate("/login")}>Member Login</a>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;