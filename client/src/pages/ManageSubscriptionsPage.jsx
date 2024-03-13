import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import { CiSquareRemove } from "react-icons/ci";

const ManageSubscriptionsPage = () => {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:3000/api/subscriptions/display-subscriptions', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch subscriptions');
                }
                const data = await response.json();
                setSubscriptions(data.subscriptions); // Now storing full subscription objects
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchSubscriptions();
    }, []);

    const handleRemoveSubscription = async (subscriptionId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3000/api/subscriptions/remove-subscription/${subscriptionId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to remove subscription');
            }

            // Remove the subscription from state to update the UI
            setSubscriptions(subscriptions.filter(sub => sub.id !== subscriptionId));
            console.log('Subscription removed successfully');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className="flex ml-10 " style={{ fontFamily: "Times New Roman, Times, serif" }}>
            <Sidebar />
            <div className="main-content flex-1 p-8 bg-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Subscriptions:</h2>
                <div className="bg-white shadow overflow-hidden rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {subscriptions.length > 0 ? (
                            subscriptions.map((subscription) => ( // Use the full subscription object
                                <li key={subscription.id} className="flex justify-between items-center px-6 py-4">
                                    <p className="text-sm font-medium text-gray-900">{subscription.title}</p>
                                    <button onClick={() => handleRemoveSubscription(subscription.id)} className="text-red-500 hover:text-red-700 flex items-center gap-2">
                                        <CiSquareRemove size={24} />Remove
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="text-center py-4">No subscriptions found.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ManageSubscriptionsPage;
