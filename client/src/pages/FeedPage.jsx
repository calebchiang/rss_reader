import React from 'react';
import Sidebar from '../components/Sidebar.jsx';
import '../styles/FeedPage.css';

const FeedPage = () => {
    return (
        <div className="feedPage">
            <div className="sidebar">
            <Sidebar/>
            </div>
            <div className="main-content">
            <h1>Feed Page</h1>
            <p>This is the feed. Content will appear here.</p>
            </div>
        </div>
    );
};

export default FeedPage;
