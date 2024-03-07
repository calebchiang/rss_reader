import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const AddSubscriptionsPage = () => {
    const [subscriptionData, setSubscriptionData] = useState({
        url: '',
        title: '', // Add title to the state
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubscriptionData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Retrieve the stored token

        try {
            const response = await fetch('http://localhost:3000/api/add-subscriptions/add-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token here
                },
                body: JSON.stringify(subscriptionData),
            });

            if (!response.ok) {
                throw new Error('Failed to add subscription');
            }

            // Handle successful subscription addition
            console.log('Subscription added successfully');
            // Optionally, redirect or update UI
        } catch (error) {
            console.error('Error:', error.message);
            // Handle error
        }
    };

    return (
        <div className="add-subscriptions">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="main-content">
                <form onSubmit={handleSubmit}>
                    <div>
                    <label>RSS Feed URL:</label>
                    <input
                        type="text"
                        name="url"
                        value={subscriptionData.url}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div>
                    <label>Title:</label> {/* Add an input for title */}
                    <input
                        type="text"
                        name="title"
                        value={subscriptionData.title}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <button type="submit">Add Subscription</button>
                </form>
            </div>
        </div>
    );
};

export default AddSubscriptionsPage;
