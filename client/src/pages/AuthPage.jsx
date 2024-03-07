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

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'An error occurred');
            }

            const data = await response.json();
            console.log('Success:', data.message);

            if (data.token) {
                localStorage.setItem('token', data.token); // Store the token for later use
            }

            navigate('/feed');
        } catch (error) {
            console.error('Error:', error.message);
            // Consider setting an error state and displaying this to the user
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
