import { getImgURLGiftCards } from "../../util";
import styles from "./Giftcard.module.css";

export default function Giftcard() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Gift Cards</h1>
          <p className={styles.subtitle}>
            Surprise your friends with gift cards and make their day.
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Happy Birthday</h2>
          <div className={styles.grid}>
            <img className={styles.cardImg} src={getImgURLGiftCards("giftcardG.jpg")} alt="Happy Birthday gift card" />
            <img className={styles.cardImg} src={getImgURLGiftCards("giftcardH.jpg")} alt="Happy Birthday gift card" />
            <img className={styles.cardImg} src={getImgURLGiftCards("giftcardj.jpg")} alt="Happy Birthday gift card" />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Good Job Team</h2>
          <div className={styles.grid}>
            <img className={styles.cardImg} src={getImgURLGiftCards("giftcardA.jpg")} alt="Good job gift card" />
            <img className={styles.cardImg} src={getImgURLGiftCards("giftcardD.jpg")} alt="Good job gift card" />
            <img className={styles.cardImg} src={getImgURLGiftCards("giftcardB.jpg")} alt="Good job gift card" />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Thank You</h2>
          <div className={styles.grid}>
            <img className={styles.cardImg} src={getImgURLGiftCards("giftcardF.jpg")} alt="Thank you gift card" />
            <img className={styles.cardImg} src={getImgURLGiftCards("giftcardB.jpg")} alt="Thank you gift card" />
            <img className={styles.cardImg} src={getImgURLGiftCards("giftcardE.jpg")} alt="Thank you gift card" />
          </div>
        </section>
      </div>
    </div>
  );
}