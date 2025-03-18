import { useState } from "react";

export default function Bookings() {
    const [isGroup, setIsGroup] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        groupSize: "2",
    });

    const toggleGroupSelection = (event) => {
        setIsGroup(event.target.value === "group");
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);

        // Clear form fields
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            groupSize: "2",
        });

        setIsGroup(false); // Reset group selection
    };

    return (
        <div className="container">
            <h2>Bookings & Group Reservations </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <br />
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    <br />

                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Email here"
                        required
                    />
                    <br />

                    <label htmlFor="phone">Phone</label>
                    <br />
                    <input
                        type="number"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <br />

                    <input
                        type="radio"
                        name="choose"
                        value="single"
                        id="single"
                        onChange={toggleGroupSelection}
                        defaultChecked
                    />
                    <label htmlFor="single"> Single </label>

                    <input
                        type="radio"
                        name="choose"
                        value="group"
                        id="group"
                        onChange={toggleGroupSelection}
                    />
                    <label htmlFor="group"> Group </label>
                </div>

                {isGroup && (
                    <div id="groupSizeDiv" style={{ marginTop: "10px" }}>
                        <label htmlFor="groupSize">Select number of people (max 5):</label>
                        <select
                            id="groupSize"
                            name="groupSize"
                            value={formData.groupSize}
                            onChange={handleChange}
                            required
                        >
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                )}

                <button type="submit" className="submit-btn">Submit</button>
            </form>

            {submitted && (
                <p className="response-message">
                    Check your email to complete reservations and bookings.
                </p>
            )}
        </div>
    );
}
