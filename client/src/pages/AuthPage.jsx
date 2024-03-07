import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const { username, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Define the toggleForm function here
    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? 'http://localhost:3000/api/auth/login' : 'http://localhost:3000/api/auth/signup';

        const method = 'POST';
        const headers = {
            'Content-Type': 'application/json',
        };
        const body = isLogin ? JSON.stringify({
            email,
            password,
        }) : JSON.stringify({
            username,
            email,
            password,
        });

        const requestOptions = {
            method,
            headers,
            body,
        };

        try {
            // Use the dynamically set URL for the request
            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'An error occurred');
            }

            const data = await response.json();
            console.log('Success:', data.message);
            navigate('/feed');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div>
            {isLogin ? (
                <div>
                    <h2>Login</h2>
                    <form onSubmit={onSubmit}>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" value={email} onChange={onChange} required />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" value={password} onChange={onChange} required />
                        </div>
                        <button type="submit">Log In</button>
                    </form>
                    <p>Don't have an account? <button onClick={toggleForm}>Sign up here</button></p>
                </div>
            ) : (
                <div>
                    <h2>Sign Up</h2>
                    <form onSubmit={onSubmit}>
                        <div>
                            <label>Username:</label>
                            <input type="text" name="username" value={username} onChange={onChange} required />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" value={email} onChange={onChange} required />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" value={password} onChange={onChange} required />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                    <p>Already have an account? <button onClick={toggleForm}>Log in here</button></p>
                </div>
            )}
        </div>
    );
};

export default AuthPage;
