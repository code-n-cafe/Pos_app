import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./profile.module.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [status, setStatus] = useState({ type: "", message: "" }); // "error" | "success"
  const [deleting, setDeleting] = useState(false);

  // If user is null/undefined, treat as unauthenticated (not "loading")
  if (!user) {
    navigate("/login");
    return null;
  }

  const dobText = useMemo(() => {
    if (!user?.dob) return "Not provided";
    const d = new Date(user.dob);
    return Number.isNaN(d.getTime()) ? "Not provided" : d.toLocaleDateString();
  }, [user?.dob]);

  const handleDelete = async () => {
    setStatus({ type: "", message: "" });

    const confirmed = window.confirm("Permanently delete your account and all data?");
    if (!confirmed) return;

    try {
      setDeleting(true);

      const token = localStorage.getItem("authToken");
      if (!token) {
        logout();
        navigate("/login");
        return;
      }

      const response = await fetch("/api/customers/me", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // robust parse (server might return text/html)
      const text = await response.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        // keep text in message if server didn't return JSON
        data = { error: text };
      }

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("authToken");
          logout();
          navigate("/login");
          return;
        }
        throw new Error(data.error || "Deletion failed");
      }

      // success
      localStorage.removeItem("authToken");
      logout();
      navigate("/");
    } catch (error) {
      console.error("Delete error:", error);
      setStatus({ type: "error", message: error.message || "An error occurred." });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Your Profile</h1>
          <p className={styles.membershipStatus}>Codes & Coffee Cafe Member</p>
        </header>

        {status.message && (
          <div className={status.type === "error" ? styles.alertError : styles.alertSuccess} role="alert">
            {status.message}
          </div>
        )}

        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Account details</h2>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.k}>Name</div>
              <div className={styles.v}>
                {user.firstName} {user.lastName}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.k}>Email</div>
              <div className={styles.v}>{user.email}</div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.k}>Phone</div>
              <div className={styles.v}>{user.phone || "Not provided"}</div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.k}>Date of birth</div>
              <div className={styles.v}>{dobText}</div>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.primaryBtn} onClick={() => navigate("/profile/edit")}>
              Edit profile
            </button>

            <button type="button" className={styles.secondaryBtn} onClick={() => { logout(); navigate("/login"); }}>
              Sign out
            </button>
          </div>
        </section>

        <section className={styles.dangerZone}>
          <div className={styles.dangerHeader}>
            <h3>Danger zone</h3>
            <p>Permanently delete your account and all associated data.</p>
          </div>

          <button
            type="button"
            className={styles.deleteBtn}
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete account"}
          </button>
        </section>
      </div>
    </div>
  );
};

export default Profile;