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

    const {username, email, password} = formData;

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
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
                body: JSON.stringify({username, email, password}),
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
        <div className="flex justify-center items-center h-screen bg-indigo-600" style={{ fontFamily: "Times New Roman, Times, serif" }}>
            <form onSubmit={onSubmit} className="w-96 p-6 shadow-lg bg-white rounded-md">
                <h1 className="text-xl mb-4">{isLogin ? 'Login' : 'Sign Up'}</h1>
                {!isLogin && (
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={onChange}
                            placeholder="Username"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Email"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Password"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <button type="submit"
                        className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
                <button type="button" onClick={toggleForm}
                        className="mt-4 w-full bg-gray-200 text-gray-700 p-2 rounded-md hover:bg-gray-300 focus:outline-none">
                    {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
                </button>
            </form>
        </div>
    );


}


export default AuthPage;
