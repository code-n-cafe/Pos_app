// src/profile/Profile.js
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './profile.module.css';

const Profile = () => {
    const { user, logout, login } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return <div className={styles.loading}>Loading...</div>;
    }

    const handleDelete = async () => {
        if (!window.confirm('Permanently delete your account and all data?')) return;
    
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                logout();
                return navigate('/login');
            }
    
            const response = await fetch('/api/customers/me', {
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            // Handle HTML/text responses
            const textData = await response.text();
            let jsonData;
            try {
                jsonData = JSON.parse(textData);
            } catch {
                throw new Error(textData || 'Unknown server error');
            }
    
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('authToken');
                    logout();
                    navigate('/login');
                }
                throw new Error(jsonData.error || 'Deletion failed');
            }
    
            logout();
            navigate('/');
            
        } catch (error) {
            console.error('Delete error:', error);
            alert(`Error: ${error.message}`);
            logout();
            navigate('/login');
        }
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
                <h1>YOUR PROFILE</h1>
                <p className={styles.membershipStatus}>CODES & COFFEE CAFE MEMBER</p>
            </div>

            <div className={styles.section}>
                <div className={styles.infoSection}>
                    <h2>ACCOUNT DETAILS</h2>
                    <div className={styles.infoItem}>
                        <span>Name:</span>
                        <p>{user.firstName} {user.lastName}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <span>Email:</span>
                        <p>{user.email}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <span>Phone:</span>
                        <p>{user.phone || 'Not provided'}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <span>Date of Birth:</span>
                        <p>{new Date(user.dob).toLocaleDateString()}</p>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button onClick={() => navigate('/profile/edit')} className={styles.editButton}>
                            Edit Profile
                        </button>
                        <div className={styles.deleteSection}>
                        <h3>Danger Zone</h3>
                        <p>Permanently delete your account and all associated data</p>
                        <button
                            type="button"
                            className={styles.deleteButton}
                        >
                            Delete Account
                        </button>
                </div>
                    </div>
                </div>
            </div>

            <div className={styles.logoutSection}>
                <button onClick={logout} className={styles.logoutButton}>
                    SIGN OUT
                </button>
            </div>
        </div>
    );
};

export default Profile;