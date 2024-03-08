import React from 'react';
import Sidebar from '../components/Sidebar.jsx';

const FeedPage = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <Sidebar className="w-64 min-h-screen bg-gray-800 text-white" />
            <div className="main-content flex-1 bg-white overflow-y-auto">
                <div className="p-8">
                    <h1 className="text-2xl font-semibold text-gray-800">Feed Page</h1>
                    <p className="mt-2 text-gray-600">This is the feed. Content will appear here.</p>
                </div>
            </div>
        </div>
    );
};

export default FeedPage;
