import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../style/Login.module.css';
import { authService } from '../services/auth.service';
import { AuthActionsContext } from '@/app/provider/AuthProvider';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { changeUser } = useContext(AuthActionsContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await authService.login({ email, password });
            changeUser(data.user);
            navigate("/");
        } catch (err) {
            setError(err.message || 'Tên đăng nhập hoặc mật khẩu không đúng.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <div className={styles.loginHeader}>
                    <div className={styles.logoBox}>
                        <img className='w-100' src="/icon.png" alt="NMS Logo" />
                    </div>
                    <h2>NMS Login</h2>
                    <p className={styles.subtitle}>News Management System</p>
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.loginButton} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className={styles.registerLink}>
                    Don't have an account? <Link to="/register">Register as Staff</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;