import React from 'react';
import Sidebar from '../components/Sidebar.jsx';

const FeedPage = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="main-content flex-1 pl-16"> {/* Adjust this padding as needed */}
                <h1>Feed Page</h1>
                <p>This is the feed. Content will appear here.</p>
            </div>
        </div>
    );
};


export default FeedPage;
