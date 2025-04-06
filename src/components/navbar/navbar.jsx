import React, {useState} from "react";
import logo from "../../assets/navbar/C&CLOGO.png"
import menuButton from "../../assets/navbar/menu.webp"
import cancelBtn from "../../assets/navbar/cancel.png"
import styles from './navbar.module.css'

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return ( 
        <nav className={styles.navbar}>
            <div className={styles.navdiv}>
            <img src={logo} alt="COC logo" className={styles.logo}/> 
            <img src={
            menuOpen
            ? cancelBtn
            : menuButton}
             alt="menu-button" className={styles.menuBtn}
             onClick={() => setMenuOpen(!menuOpen)}
             />
            
            </div>
            <a  className={styles.title} href="/">CODES AND COFFEE CAFE</a>
        <div className={styles.menu}>
            <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}>
                <li> <a href="/Services">Book Now!</a></li>
                <li> <a href="/About">Our Menus</a></li>
                <li> <a href="/Projects">Gift  Cards</a></li>
                <li> <a href="/Contact">Contact Us</a></li>
                <li> <a href="/LogIn">Member Login</a></li>
            </ul>
        </div>
    </nav>
      );
}

export default Navbar;