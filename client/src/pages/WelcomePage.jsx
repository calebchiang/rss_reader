import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();

    const goToAuthPage = () => {
        navigate('/auth');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to RSS Reader</h1>
            <p className="text-lg text-gray-600 mb-8">All your curated content in one place. Get started by signing in or creating an account.</p>
            <button onClick={goToAuthPage} className="px-6 py-3 bg-indigo-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-150 ease-in-out">
                Sign In / Sign Up
            </button>
        </div>
    );
};

export default WelcomePage;
