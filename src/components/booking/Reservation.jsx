import { useState } from "react";
import styles from "./reservation.module.css";

export default function Reservation() {
    const [formData, setFormData] = useState({
        email: "",
        phone: ""
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Client-side validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
    
        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email address.");
            return;
        }
    
        if (!phoneRegex.test(formData.phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }
        
        if (formData.group && (formData.numberOfPeople < 2)) {
            alert("Please select a valid number of people for group booking.");
            return;
        }

        // Ensure numberOfPeople is set to 1 if group booking is not checked
        const finalFormData = {
            ...formData,
            numberOfPeople: formData.group ? formData.numberOfPeople : 1,
        };
    
        setLoading(true);
        try {
            const response = await fetch("/api/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalFormData),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Booking successfully created!");
                setFormData({
                    name: "",
                    check_in: "",
                    check_out: "",
                    email: "",
                    phone: "",
                    group: false,
                    numberOfPeople: 1,
                });
            } else {
                alert(data.error || "Unable to process your booking. Please check your details and try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
            };
    return (
    <div>
        <h2>Reservation</h2>
        <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Phone:</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <button type="submit" disabled={loading}>{loading ? "Loading..." : "Submit"}</button>
        </form>
    </div>
)
}
