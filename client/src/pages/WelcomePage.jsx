import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero.jsx';

const WelcomePage = () => {

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <Hero/>
        </div>
    );
};

export default WelcomePage;
