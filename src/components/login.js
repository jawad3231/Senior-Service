import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Track password visibility
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch('http://localhost:5000/api/auth/login', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(formData)
    //         });

    //         const data = await response.json();

    //         if (response.ok) {
    //             localStorage.setItem('token', data.token);
    //             localStorage.setItem('profile', JSON.stringify(data.user));
    //             localStorage.setItem("userId", data.user._id);
    //             setUser(data.user);
    //             navigate('/candidate-dashboard');
    //         } else {
    //             setError(data.message);
    //         }
    //     } catch (error) {
    //         console.error('Error during login:', error);
    //         setError('Login failed. Please try again.');
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
    
            const data = await response.json();
    
            // Log the response data for debugging
            console.log('Response Data:', data);
            console.log('Response Status:', response.status);
    
            if (response.ok) {
                // Login success, save user data and token in localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('profile', JSON.stringify(data.user));
                localStorage.setItem("userId", data.user._id);
    
                // Make sure setUser is a function passed as a prop
                if (typeof setUser === 'function') {
                    setUser(data.user);
                } else {
                    console.error('setUser is not a function');
                }
    
                navigate('/candidate-dashboard');
            } else {
                // If response is not ok, display error message
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Login failed. Please try again.');
        }
    };
    
    
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                    <h2 className="text-center mb-4">Log in</h2>
                        {error && <div className="alert alert-danger">{error}</div>}

                        <form onSubmit={handleSubmit} className="p-4 rounded shadow-sm">
                            {/* Email Input with Floating Label */}
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="name@example.com"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>

                            {/* Password Input with Floating Label */}
                            <div className="form-floating mb-3 position-relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="floatingPassword">Password</label>
                                <button
                                    type="button"
                                    className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-3"
                                    onClick={handlePasswordToggle}
                                >
                                    {showPassword ? (
                                        <i className="bi bi-eye-slash"></i> // Eye Slash icon for Hide
                                    ) : (
                                        <i className="bi bi-eye"></i> // Eye icon for Show
                                    )}
                                </button>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="rememberMe"
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe">
                                        Remember me
                                    </label>
                                </div>
                                <a href="/forgot-password" className="text-decoration-none">
                                    Forgot password?
                                </a>
                            </div>

                            <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>

                            <button
                                type="button"
                                className="btn btn-outline-primary w-100 mb-3"
                                onClick={() => alert('Login with Google')}
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png"
                                    alt="Google logo"
                                    style={{ width: '20px', marginRight: '10px' }}
                                />
                                Login with Google
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
