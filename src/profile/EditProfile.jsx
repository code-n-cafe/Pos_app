import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './edit.module.css';
import { authFetch } from '../components/lib/api';

const EditProfile = () => {
    const { user, logout, login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Get fresh token from storage
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error('No authentication token found');
    
            const response = await authFetch('/api/customers/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    dob: new Date(formData.dob).toISOString()
                })
            });
    
            const data = await response.json();
            
            if (!response.ok) {
                // Handle token expiration
                if (data.error.includes('Invalid token')) {
                    logout();
                    navigate('/login');
                }
                throw new Error(data.error || 'Update failed');
            }
    
            // Update context with new data
            login(data, token);
            navigate('/profile');
    
        } catch (err) {
            setError(err.message);
            if (err.message.includes('Invalid token')) {
                logout();
                navigate('/login');
            }
        }
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
                <h1>EDIT PROFILE</h1>
                <p className={styles.membershipStatus}>CODES & COFFEE CAFE MEMBER</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.editForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        pattern="[0-9]{10}"
                        placeholder="1234567890"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.saveButton}>
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/profile')}
                        className={styles.cancelButton}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;