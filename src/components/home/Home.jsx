import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

export default function Home(){
    const navigate = useNavigate();

    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.textBox}>
            <h1>...Need some space to code in comfort?</h1>
            <h2>We got you covered!</h2>
                <p>Enjoy a peaceful workspace, with meals, and coffee!</p>
                <p>Walk in, or book your spot today and experience the perfect blend of productivity and relaxation!</p>
                <br/>
                <p>Wanna become our regular and enjoy our discounts?</p>
                <button className={styles.signUpButton} onClick={() => navigate('/SignUp')}>Sign Up</button>
            </div>
        </div>
    )
}


