import { useState } from 'react';

export default function SignUp() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.dob || !formData.email || !formData.password) {
            alert('All fields are required!');
            return;
        }
    
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
    
        try {
            const response = await fetch('api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    dob: formData.dob,
                    email: formData.email,
                    password: formData.password,
                }),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                setFormData({
                    firstName: '',
                    lastName: '',
                    dob: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to sign up. Please try again.');
        }
    };

    return (
        <div className="SignUpInfo">
            <h1>Sign Up Here</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <br />
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                <br />

                <label htmlFor="lastName">Last Name</label>
                <br />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                <br />

                <label htmlFor="dob">Date Of Birth</label>
                <br />
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                <br />

                <label htmlFor="email">Email</label>
                <br />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email here" />
                <br />

                <label htmlFor="password">Enter Password</label>
                <br />
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                <br />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <br />
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                <br />

                <button type="submit">Sign Me Up</button>
            </form>
            <p>
                Already have an account? <a href="LogIn">Sign In</a>
            </p>
        </div>
    );
}