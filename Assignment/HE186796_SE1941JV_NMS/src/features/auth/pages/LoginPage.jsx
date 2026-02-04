import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style/Login.module.css';
import { authService } from '../services/auth.service';
import { AuthActionsContext } from '@/app/provider/AuthProvider';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { changeUser } = useContext(AuthActionsContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await authService.login({
                email,
                password
            })
            changeUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("accessToken", data.accessToken);

            navigate("/")

        } catch (err) {
            setError(err.message || 'Tên đăng nhập hoặc mật khẩu không đúng.');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <div className={styles.loginHeader}>
                    <div className={styles.logoBox}>
                        <img className='w-100' src="/icon.png" alt="" />
                    </div>
                    <h2>NMS Login</h2>
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <label>Account / Email</label>
                        <input
                            type="text"
                            placeholder="Nhập Admin"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Nhập Admin"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.loginButton}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;