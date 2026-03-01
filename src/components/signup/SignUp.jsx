import { useState } from "react";
import styles from "./SignUp.module.css";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" }); // type: "error" | "success"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.firstName || !formData.lastName || !formData.dob || !formData.email || !formData.password) {
      return "All fields are required.";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }
    if (formData.password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    const error = validate();
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }

    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: formData.dob,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus({ type: "error", message: data.error || "Sign up failed. Please try again." });
        return;
      }

      setStatus({ type: "success", message: data.message || "Account created successfully." });
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Network error. Please try again." });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Create an account</h1>
          <p>Join Codes & Coffee for member benefits and faster checkout.</p>
        </header>

        <form className={styles.card} onSubmit={handleSubmit} noValidate>
          {status.message && (
            <div className={status.type === "error" ? styles.alertError : styles.alertSuccess} role="alert">
              {status.message}
            </div>
          )}

          <div className={styles.grid2}>
            <div className={styles.field}>
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" type="text" autoComplete="given-name"
                value={formData.firstName} onChange={handleChange} required />
            </div>

            <div className={styles.field}>
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" type="text" autoComplete="family-name"
                value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="dob">Date of Birth</label>
            <input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="name@example.com"
              value={formData.email} onChange={handleChange} required />
          </div>

          <div className={styles.grid2}>
            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" autoComplete="new-password"
                value={formData.password} onChange={handleChange} required />
            </div>

            <div className={styles.field}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password"
                value={formData.confirmPassword} onChange={handleChange} required />
            </div>
          </div>

          <button className={styles.primaryBtn} type="submit">Create account</button>

          <p className={styles.smallText}>
            Already have an account? <a href="/#/login">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
}