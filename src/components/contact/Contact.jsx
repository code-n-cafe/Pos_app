import { getImgURL } from "../../util";
import styles from "./contact.module.css";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit logic
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Contact Us</h1>
          <p>
            We're here to help. Send an inquiry, support request, or feedback.
            You can also email us at <a href="mailto:ccc@mail.com">ccc@mail.com</a>.
          </p>
        </header>

        <div className={styles.content}>
          <form className={styles.card} onSubmit={handleSubmit}>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label htmlFor="fname">First Name</label>
                <input id="fname" name="fname" type="text" autoComplete="given-name" required />
              </div>

              <div className={styles.field}>
                <label htmlFor="lname">Last Name</label>
                <input id="lname" name="lname" type="text" autoComplete="family-name" required />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(555) 123-4567"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Enter your message here..."
                required
              />
            </div>

            <button className={styles.primaryBtn} type="submit">
              Send
            </button>
          </form>

          <aside className={styles.imageCard} aria-hidden="true">
            <img src={getImgURL("callpicture.jpg")} alt="" />
          </aside>
        </div>
      </div>
    </div>
  );
}