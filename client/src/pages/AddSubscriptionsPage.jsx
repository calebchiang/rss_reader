import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const AddSubscriptionsPage = () => {
    const [subscriptionData, setSubscriptionData] = useState({
        url: '',
        title: '',
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
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3000/api/subscriptions/add-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(subscriptionData),
            });

            if (!response.ok) {
                throw new Error('Failed to add subscription');
            }

            console.log('Subscription added successfully');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className="flex flex-row min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-1 items-center justify-center p-10">
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow-md px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="url" className="block text-gray-700 text-sm font-bold mb-2">RSS Feed URL:</label>
                        <input
                            type="text"
                            name="url"
                            id="url"
                            value={subscriptionData.url}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={subscriptionData.title}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Add Subscription
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSubscriptionsPage;
