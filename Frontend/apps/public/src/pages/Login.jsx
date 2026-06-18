import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../services/authApi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useDocumentTitle from '../hooks/useDocumentTitle';
import ShimmerButton from '@netsurf/ui/common/ShimmerButton';
import './Login.scss';

const Login = () => {
    const [formData, setFormData] = useState({ login: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [login, { isLoading, error }] = useLoginMutation();
    const navigate = useNavigate();
    
    // Update document title
    useDocumentTitle('Login');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(formData).unwrap();
            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>NFCWALA</h1>
                    <p>Super Admin Login</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="error-message">{error?.data?.message || 'Login failed'}</div>}
                    
                    <div className="form-group">
                        <label>Login</label>
                        <input
                            type="text"
                            name="login"
                            value={formData.login}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email or username"
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <ShimmerButton
                        type="submit"
                        variant="primary"
                        isLoading={isLoading}
                        loadingText="Logging in..."
                        style={{ width: '100%' }}
                    >
                        Login
                    </ShimmerButton>
                </form>
            </div>
        </div>
    );
};

export default Login;
