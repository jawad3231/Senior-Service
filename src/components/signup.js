import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setFormData }) => {
    const userProfile = JSON.parse(localStorage.getItem("profile"));
    const userId = userProfile?._id;

    const [formData, setLocalFormData] = useState({
        userId: userId,
        username: '',
        email: '',
        password: '',
        role: 'candidate'
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('signupData', JSON.stringify(formData));
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', formData.role);

                setFormData(prev => ({ ...prev, ...formData }));

                if (formData.role === 'candidate') {
                    navigate('/candidate-service-type');
                } else if (formData.role === 'employer') {
                    navigate('/employeer-service-type');
                }
            } else {
                alert('Signup failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex" style={{ height: '100vh' }}>
                
                {/* Left Side - Form */}
                <div className="d-flex flex-column justify-content-center p-5 bg-white" style={{ width: '52%', height: '100vh' }}>
                    <h1>Join now to find care</h1>
                    <p className='mb-4'>Find the right person. Contact easily. Save time.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="username" 
                                name="username" 
                                placeholder="Username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                required 
                            />
                            <label htmlFor="username">Username</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                name="email" 
                                placeholder="name@example.com" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                            <label htmlFor="email">Email address</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                name="password" 
                                placeholder="Password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        {/* Role Dropdown */}
                        <div className="form-floating mb-3">
                            <select 
                                className="form-select" 
                                id="role" 
                                name="role" 
                                value={formData.role} 
                                onChange={handleChange} 
                            >
                                <option value="candidate">Candidate</option>
                                <option value="employer">Employer</option>
                            </select>
                            <label htmlFor="role">Select Role</label>
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Create account</button>
                    </form>
                </div>

                {/* Separator */}
                <div className="d-flex align-items-center justify-content-center" style={{ width: '120px', backgroundColor: '#f8f9fa', height: '100vh' }}>
                    <svg height="100%" width="100%" viewBox="0 0 30 120" preserveAspectRatio="none">
                        <path d="M 15 -15 C 65 45, -35 60, 15 130 L 0 130 L 0 -30 Z" fill="#ffffff"></path>
                    </svg>
                </div>

                {/* Right Side - Info Section */}
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: '48%', backgroundColor: '#f8f9fa', height: '100vh' }}>
                    <h3 className="mb-4 text-dark">Why Join Us?</h3>
                    <ul className="list-unstyled text-dark">
                        <li className="mb-3">
                            <i className="bi bi-check-circle-fill me-2"></i> Best job chances for you
                        </li>
                        <li className="mb-3">
                            <i className="bi bi-check-circle-fill me-2"></i> Jobs in your area
                        </li>
                        <li className="mb-3">
                            <i className="bi bi-check-circle-fill me-2"></i> Attractive income
                        </li>
                        <li className="mb-3">
                            <i className="bi bi-check-circle-fill me-2"></i> Get notified about new jobs
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Signup;
