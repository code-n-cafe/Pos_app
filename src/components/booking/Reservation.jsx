import { useState } from "react";
import styles from "./reservation.module.css";

export default function ReservationLookup() {
  const [query, setQuery] = useState({ email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" }); // "error" | "success"
  const [booking, setBooking] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const email = query.email.trim();
    const phoneDigits = query.phone.replace(/\D/g, "");

    const hasEmail = email.length > 0;
    const hasPhone = phoneDigits.length > 0;

    if (!hasEmail && !hasPhone) return "Enter an email or a phone number.";

    if (hasEmail && hasPhone) return "Please use only one: email OR phone (not both).";

    if (hasEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) return "Please enter a valid email address.";
    }

    if (hasPhone) {
      if (phoneDigits.length !== 10) return "Please enter a valid 10-digit phone number.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setBooking(null);

    const err = validate();
    if (err) {
      setStatus({ type: "error", message: err });
      return;
    }

    const email = query.email.trim();
    const phone = query.phone.replace(/\D/g, "");

    const payload = email ? { email } : { phone };
    
    setLoading(true);
    try {
      const res = await fetch("/api/booking/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // {email} or {phone}
        });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({
          type: "error",
          message: data.error || "No booking found with that information.",
        });
        return;
      }

      // Expect: data.booking (object) OR data itself is booking
      const found = data.booking ?? data;

      setBooking(found);
      setStatus({ type: "success", message: "Booking found." });
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Find your booking</h1>
          <p>Enter your email or phone number to look up an existing booking.</p>
        </header>

        <form className={styles.card} onSubmit={handleSubmit} noValidate>
          {status.message && (
            <div className={status.type === "error" ? styles.alertError : styles.alertSuccess} role="alert">
              {status.message}
            </div>
          )}

          <div className={styles.grid2}>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={query.email}
                onChange={handleChange}
                disabled={loading}
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
                value={query.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <p className={styles.helpText}>
            Use <strong>one</strong> field only (email or phone).
          </p>

          <button className={styles.primaryBtn} type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Results card */}
        {booking && (
          <div className={styles.resultCard}>
            <h2 className={styles.resultTitle}>Booking Details</h2>

            <div className={styles.resultGrid}>
              <div>
                <div className={styles.k}>Email</div>
                <div className={styles.v}>{booking.email ?? "—"}</div>
              </div>

              <div>
                <div className={styles.k}>Phone</div>
                <div className={styles.v}>{booking.phone ?? "—"}</div>
              </div>

              <div>
                <div className={styles.k}>Group</div>
                <div className={styles.v}>{booking.group ? "Yes" : "No"}</div>
              </div>

              <div>
                <div className={styles.k}>People</div>
                <div className={styles.v}>{booking.numberOfPeople ?? "—"}</div>
              </div>

              {/* If your booking model includes these, they’ll render */}
              <div>
                <div className={styles.k}>Check-in</div>
                <div className={styles.v}>{booking.check_in ?? booking.checkIn ?? "—"}</div>
              </div>

              <div>
                <div className={styles.k}>Check-out</div>
                <div className={styles.v}>{booking.check_out ?? booking.checkOut ?? "—"}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}