import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../style/Login.module.css';
import { authService } from '../services/auth.service';
import { AuthActionsContext } from '@/app/provider/AuthProvider';

const RegisterPage = () => {
    const [form, setForm] = useState({ accountName: '', accountEmail: '', accountPassword: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { changeUser } = useContext(AuthActionsContext);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (form.accountPassword !== form.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (form.accountPassword.length < 2) {
            setError('Password must be at least 2 characters.');
            return;
        }

        setLoading(true);
        try {
            const data = await authService.register({
                accountName: form.accountName,
                accountEmail: form.accountEmail,
                accountPassword: form.accountPassword,
            });
            changeUser(data.user);
            navigate("/");
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard} style={{ maxWidth: '450px' }}>
                <div className={styles.loginHeader}>
                    <div className={styles.logoBox}>
                        <img className='w-100' src="/icon.png" alt="NMS Logo" />
                    </div>
                    <h2>Staff Registration</h2>
                    <p className={styles.subtitle}>Create a new staff account</p>
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <form onSubmit={handleRegister}>
                    <div className={styles.inputGroup}>
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="accountName"
                            placeholder="Enter your full name"
                            value={form.accountName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="accountEmail"
                            placeholder="Enter your email"
                            value={form.accountEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            name="accountPassword"
                            placeholder="Enter password"
                            value={form.accountPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>



                    <button type="submit" className={styles.loginButton} disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className={styles.registerLink}>
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
