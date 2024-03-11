import React from 'react'
import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();

    const goToAuthPage = () => {
        navigate('/auth');
    };
    return(
        <div className="container flex flex-col-reverse lg:flex-row items-center justify-between mt-14 lg:mt-28" style={{ fontFamily: "Times New Roman, Times, serif" }}>
            <div className="flex flex-1 flex-col items-center lg:items-start">
                <h2 className="text-3xl md:text-4 lg:text-5xl text-center lg:text-left mb-6">A Simple RSS Reader</h2>
                <p className="text-lg text-center lg:text-left mb-6">All your curated content in one place.</p>
                <div className="flex justify-center flex-wrap gap-6">
                    <button onClick={goToAuthPage} className="px-6 py-3 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out">
                        Sign In / Sign Up
                    </button>
                </div>
            </div>
            <div className="justify-start flex-1 mr-80">
                <img className="w-40 h-40 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48" src='../rss.png' alt='RSS Icon'/>
            </div>
        </div>

    )

}


export default Hero;