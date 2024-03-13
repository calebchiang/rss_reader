const Subscription = require('../models/subscription');


exports.addSubscription = async (req, res) => {
    try {
        const { url, title } = req.body;
        const userId = req.user.userId;

        const newSubscription = new Subscription({
            user: userId,
            url,
            title,
        });

        const savedSubscription = await newSubscription.save();

        res.status(201).json({
            message: "Subscription added successfully",
            subscription: savedSubscription,
        });
    } catch (error) {
        console.error('Error adding subscription:', error);
        res.status(500).json({ message: "Error adding subscription", error: error.message });
    }
};

exports.removeSubscription = async (req, res) => {
    try {
        const subscriptionId = req.params.subscriptionId;
        const userId = req.user.userId;

        const deletedSubscription = await Subscription.findOneAndDelete({
            _id: subscriptionId,
            user: userId,
        });

        if (!deletedSubscription) {
            return res.status(404).json({ message: "Subscription not found or does not belong to the user" });
        }

        res.json({ message: "Subscription removed successfully" });
    } catch (error) {
        console.error('Error removing subscription:', error);
        res.status(500).json({ message: "Error removing subscription", error: error.message });
    }
};


exports.displaySubscriptions = async (req, res) => {
    try {
        const userId = req.user.userId; // Extract the user ID from the request

        // Query the database for subscriptions that belong to the user
        const subscriptions = await Subscription.find({ user: userId }).exec();

        // Map over the subscriptions to extract the necessary information
        const subscriptionData = subscriptions.map(subscription => ({
            id: subscription._id,
            title: subscription.title,
        }));

        // Return the subscription data (including IDs and titles) to the client
        res.json({
            message: "Subscriptions retrieved successfully",
            subscriptions: subscriptionData,
        });
    } catch (error) {
        console.error('Error retrieving subscriptions:', error);
        res.status(500).json({ message: "Error retrieving subscriptions", error: error.message });
    }
};

