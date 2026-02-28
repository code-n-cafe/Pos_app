import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.h1}>Need some space to code in comfort?</h1>
          <h2 className={styles.h2}>We got you covered.</h2>

          <p className={styles.p}>
            Enjoy a peaceful workspace, with meals and coffee.
          </p>
          <p className={styles.p}>
            Walk in, or book your spot today and experience the perfect blend of productivity and relaxation.
          </p>

          <p className={styles.pMuted}>
            Want to become a regular and enjoy discounts?
          </p>

          <div className={styles.actions}>
            <button className={styles.primaryBtn} onClick={() => navigate("/SignUp")}>
              Sign Up
            </button>
            <button className={styles.secondaryBtn} onClick={() => navigate("/bookings")}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}