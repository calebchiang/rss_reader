import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Card from '../components/Card.jsx';
import { GiCoffeeCup } from "react-icons/gi";

const FeedPage = () => {
    const [feeds, setFeeds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Define the function to update the feed
        const updateFeed = async () => {
            setIsLoading(true); // Start loading
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/feed/update', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch the feed');
                }

                const data = await response.json(); // Parse the JSON response
                setFeeds(data); // Set the feeds in the state
            } catch (error) {
                console.error('Error fetching feed update:', error);
                // Handle the error state here, if needed
            }
            setIsLoading(false); // Finish loading
        };

        // Define the function to fetch the username
        const fetchUsername = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:3000/api/user/username', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch username');
                }

                const data = await response.json();
                setUsername(data.username); // Set the fetched username
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

        // Call both functions
        updateFeed();
        fetchUsername();
    }, []);

if (isLoading) {
        return (
            <div className="flex h-screen bg-gray-100">
                <Sidebar className="w-64 h-screen bg-gray-800 text-white fixed inset-y-0 left-0" />
                <div className="main-content flex-1 ml-64 p-8">
                    <div className="flex justify-center items-center h-full">
                        <div>Loading...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar className="w-64 h-screen bg-gray-800 text-white fixed inset-y-0 left-0" />
            <div className="flex-1 ml-16 p-8 flex flex-col">
                <div className="flex justify-center">
                    <h1 className="text-2xl font-semibold text-gray-800" style={{ fontFamily: "Times New Roman, Times, serif" }}>Welcome back, {username}</h1>
                </div>
                <div className="flex justify-center">
                    <h2 className="text-xl text-gray-800" style={{ fontFamily: "Times New Roman, Times, serif" }}>Enjoy your readings for today</h2>
                    <GiCoffeeCup />
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
                    {feeds.map((feed, index) => (
                        <Card key={index} feed={feed} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeedPage;
