import { useState } from 'react';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LogIn() {
    const auth = useAuth();
    
    if (!auth) {
        return <div>Authentication system not available</div>;
    }
    const { login } = useAuth(); // Get login function from context
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
        
        try {
            const response = await fetch('/api/customers/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
            
            if (response.ok) {
                login(data.user, data.token);
                // Navigate after state update
                setTimeout(() => navigate('/profile'), 50);
            } else {
                alert(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Login failed');
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