const Subscription = require('../models/subscription');

exports.addSubscription = async (req, res) => {
    try {
        const { url, title } = req.body;
        const userId = req.user.userId; // Get the user ID from the decoded token

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