import styles from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerInner}>
                <div className={styles.footerInfo}>
                    <details className={styles.section}>
                        <summary>About Us</summary>
                        <ul>
                            <li><a href="">Our Cafe</a></li>
                            <li><a href="">Stories and News</a></li>
                            <li><a href="">Customer Service</a></li>
                            <li><a href="">Our Services</a></li>
                        </ul>
                    </details>
                    <details className={styles.section}>
                        <summary>Careers</summary>
                        <ul>
                            <li><a href="">Culture and Values</a></li>
                            <li><a href="">Diversity and Inclusion Policies</a></li>
                            <li><a href="">C&C Careers</a></li>
                            <li><a href="">Workforce Support</a></li>
                        </ul>
                    </details>
                    <details className={styles.section}>
                        <summary>Networking</summary>
                        <ul>
                            <li><a href="">Hosting</a></li>
                            <li><a href="">Events & Webinars</a></li>
                            <li><a href="">Insights</a></li>
                            <li><a href="">Upcoming Events</a></li>
                        </ul>
                    </details>
                </div>
                <aside className={styles.footerSocial}>
                <ul>
                    <li>
                        <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faXTwitter} />
                        </a>
                        <span>#Code_n_Coffee</span>
                    </li>
                    <li>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <span>@Code_n_Coffee</span>
                    </li>
                </ul>
            </aside>
            </div>
        </footer>
    );
}