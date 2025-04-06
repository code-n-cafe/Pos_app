import { useState } from 'react';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.email || !formData.password) {
            alert('An email or password is required!');
            return;
        }

        try {
            const response = await fetch('api/customers/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });
            const data = await response.json();

            if (response.ok) {
                // Handle successful login
                alert('Sign in successful!');
                navigate('/Services'); // Redirect to Services page
            } else {
                alert('Incorrect email or password. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to sign in. Please try again.');
        }
    };

    return (
        <div className={styles.LogInInfo}>
            <div className={styles.SignUpInfo}>
                <h1>Sign In Here</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email here"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="password">Enter Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Your password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <br />
                    <button type="submit">Sign In</button>
                </form>
                <p>Don't have an account?
                    <button onClick={() => navigate('/SignUp')}>Register Now!</button>
                </p>
            </div>
        </div>
    );
}