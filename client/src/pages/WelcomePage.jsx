import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();

    const goToAuthPage = () => {
        navigate('/auth');
    };

    return (
        <div>
            <h1> Welcome to RSS Reader</h1>
            <p> Get started by signing in or creating an account</p>
            <button onClick={goToAuthPage}>Sign In / Sign Up</button>
        </div>
    );
};

export default WelcomePage;