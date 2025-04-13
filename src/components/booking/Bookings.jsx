import { useState } from "react";
import styles from "./booking.module.css";

export default function Bookings() {
    const [formData, setFormData] = useState({
        name: "",
        check_in: "",
        check_out: "",
        email: "",
        phone: "",
        group: false,
        numberOfPeople: 1,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => {
            const updatedFormData = {
                ...prev,
                [name]: type === "checkbox" ? checked : (name === "numberOfPeople" ? parseInt(value, 10) : value),
            };
    
            // Automatically adjust numberOfPeople when group is toggled
            if (name === "group") {
                updatedFormData.numberOfPeople = checked ? 2 : 1;
            }
    
            return updatedFormData;
        });
    };

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
    return (
        <div className={styles.bookingForm}>
            <h1 className={styles.heading}>Book Your Reservation</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="check_in">Check-in Date</label>
                <input
                    type="date"
                    name="check_in"
                    value={formData.check_in}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="check_out">Check-out Date</label>
                <input
                    type="date"
                    name="check_out"
                    value={formData.check_out}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="phone">Phone</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    required
                />

                <label>
                    <input
                        type="checkbox"
                        name="group"
                        checked={formData.group}
                        onChange={handleChange}
                    />
                    Group Booking
                </label>

                {formData.group && (
                    <div>
                        <label htmlFor="numberOfPeople">Number of People</label>
                        <select
                            name="numberOfPeople"
                            value={formData.numberOfPeople}
                            onChange={handleChange}
                            required={formData.group}
                        >
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </button>
                <p> Already had a reservation with us? Check you booking  
                    <a href="/Reservation"> here</a>
                </p>
            </form>
        </div>
    );
}