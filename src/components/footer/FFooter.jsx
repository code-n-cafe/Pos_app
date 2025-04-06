import { getImgURL } from "../../util";
import styles from "./footer.module.css";

export default function Footer() {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.section}>
                <h4>About Us</h4>
                <ul>
                    <li><a href="">Our Cafe</a></li>
                    <li><a href="">Stories and News</a></li>
                    <li><a href="">Customer Service</a></li>
                    <li><a href="">Our Services</a></li>
                </ul>
            </div>
            <div className={styles.section}>
                <h4>Careers</h4>
                <ul>
                    <li><a href="">Culture and Values</a></li>
                    <li><a href="">Diversity and Inclusion Policies</a></li>
                    <li><a href="">C&C Careers</a></li>
                    <li><a href="">Workforce Support</a></li>
                </ul>
            </div>
            <div className={styles.section}>
                <h4>Networking</h4>
                <ul>
                    <li><a href="">Hosting</a></li>
                    <li><a href="">Events & Webinars</a></li>
                    <li><a href="">Insights</a></li>
                    <li><a href="">Upcoming Events</a></li>
                </ul>
            </div>
            <div className={styles.section}>
                <h4>Follow Us</h4>
                <ul>
                    <li>
                        <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
                            <img height={25} width={25} src={getImgURL("twitter.jpg")} alt="Twitter" />
                        </a>
                        <a> #Code_n_Coffee</a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src={getImgURL("instagram.jpg")} alt="Instagram" width={25} height={25} />
                        </a>
                        <a> @Code_n_Coffee</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}