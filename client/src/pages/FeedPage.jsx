import React from 'react';
import Sidebar from '../components/Sidebar.jsx';

const FeedPage = () => {
    const handleUpdateClick = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/feed/update', {
                method: 'GET', // or 'POST' if your endpoint requires it
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch the feed');
            }

            // You can process the response if needed, or just confirm in console
            console.log('Feed update requested successfully');
        } catch (error) {
            console.error('Error fetching feed update:', error);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <Sidebar className="w-64 min-h-screen bg-gray-800 text-white" />
            <div className="main-content flex-1 bg-white overflow-y-auto">
                <div className="p-8">
                    <h1 className="text-2xl font-semibold text-gray-800">Feed Page</h1>
                    <p className="mt-2 text-gray-600">This is the feed. Content will appear here.</p>
                    <button onClick={handleUpdateClick} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition ease-in-out duration-150">
                        Update Feed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedPage;
